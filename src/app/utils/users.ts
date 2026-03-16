import { supabase } from '../lib/supabase';

export interface UserProfile {
    id: string;
    name: string;
    pin: string;
    avatar: string;
    createdAt: string;
}

const ACTIVE_USER_STORAGE_KEY = 'mentactiva_active_user';

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

export async function createUser(name: string, pin: string, avatar: string): Promise<UserProfile | null> {
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

export function setActiveUser(userId: string): void {
    localStorage.setItem(ACTIVE_USER_STORAGE_KEY, userId);
}

export function getActiveUserId(): string | null {
    return localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
}

export async function getActiveUser(): Promise<UserProfile | null> {
    const activeUserId = getActiveUserId();
    if (!activeUserId) return null;
    return await getUserById(activeUserId);
}

export function clearActiveUser(): void {
    localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
}

export async function deleteUser(userId: string): Promise<void> {
    const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

    if (error) {
        console.error('Error deleting user:', error);
    }

    const activeUserId = getActiveUserId();
    if (activeUserId === userId) {
        clearActiveUser();
    }
}