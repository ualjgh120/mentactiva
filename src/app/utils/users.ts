import { supabase } from '../lib/supabase';

export interface UserProfile {
    id: string;
    name: string;
    pin: string;
    avatar: string;
    createdAt: string;
}

const SELECTED_USER_STORAGE_KEY = 'menteactiva_selected_user';
const AUTHENTICATED_USER_STORAGE_KEY = 'menteactiva_authenticated_user';

export async function getUsers(): Promise<UserProfile[]> {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error loading users:', error);
        return [];
    }

    return (data ?? []).map((u) => ({
        id: u.id,
        name: u.name,
        pin: u.pin,
        avatar: u.avatar,
        createdAt: u.created_at,
    }));
}

export async function createUser(
    name: string,
    pin: string,
    avatar: string
): Promise<UserProfile | null> {
    const { data, error } = await supabase
        .from('users')
        .insert({
            name: name.trim(),
            pin: pin.trim(),
            avatar,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating user:', error);
        return null;
    }

    return {
        id: data.id,
        name: data.name,
        pin: data.pin,
        avatar: data.avatar,
        createdAt: data.created_at,
    };
}

export async function getUserById(id: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) return null;

    return {
        id: data.id,
        name: data.name,
        pin: data.pin,
        avatar: data.avatar,
        createdAt: data.created_at,
    };
}

export async function validateUserPin(userId: string, pin: string): Promise<boolean> {
    const user = await getUserById(userId);
    if (!user) return false;
    return user.pin === pin.trim();
}

/* Usuario seleccionado: solo para pasar de Acceso -> Pin */
export function setSelectedUser(userId: string): void {
    localStorage.setItem(SELECTED_USER_STORAGE_KEY, userId);
}

export function getSelectedUserId(): string | null {
    return localStorage.getItem(SELECTED_USER_STORAGE_KEY);
}

export async function getSelectedUser(): Promise<UserProfile | null> {
    const selectedUserId = getSelectedUserId();
    if (!selectedUserId) return null;
    return await getUserById(selectedUserId);
}

export function clearSelectedUser(): void {
    localStorage.removeItem(SELECTED_USER_STORAGE_KEY);
}

/* Usuario autenticado: solo tras PIN correcto */
export function setAuthenticatedUser(userId: string): void {
    localStorage.setItem(AUTHENTICATED_USER_STORAGE_KEY, userId);
}

export function getAuthenticatedUserId(): string | null {
    return localStorage.getItem(AUTHENTICATED_USER_STORAGE_KEY);
}

export async function getAuthenticatedUser(): Promise<UserProfile | null> {
    const authenticatedUserId = getAuthenticatedUserId();
    if (!authenticatedUserId) return null;
    return await getUserById(authenticatedUserId);
}

export function clearAuthenticatedUser(): void {
    localStorage.removeItem(AUTHENTICATED_USER_STORAGE_KEY);
}

export function clearAllSessionData(): void {
    clearSelectedUser();
    clearAuthenticatedUser();
}

export async function deleteUser(userId: string): Promise<void> {
    const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

    if (error) {
        console.error('Error deleting user:', error);
    }

    if (getSelectedUserId() === userId) {
        clearSelectedUser();
    }

    if (getAuthenticatedUserId() === userId) {
        clearAuthenticatedUser();
    }
}