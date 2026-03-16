export interface AvatarOption {
    id: string;
    label: string;
    emoji: string;
    bgColor: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
    { id: 'abuela-1', label: 'Abuela 1', emoji: '👵', bgColor: '#FCE7F3' },
    { id: 'abuelo-1', label: 'Abuelo 1', emoji: '👴', bgColor: '#DBEAFE' },
    { id: 'persona-1', label: 'Persona 1', emoji: '🧓', bgColor: '#DCFCE7' },
    { id: 'persona-2', label: 'Persona 2', emoji: '🙂', bgColor: '#FEF3C7' },
    { id: 'persona-3', label: 'Persona 3', emoji: '😊', bgColor: '#EDE9FE' },
    { id: 'persona-4', label: 'Persona 4', emoji: '😁', bgColor: '#FEE2E2' },
];

export function getAvatarById(id: string): AvatarOption | undefined {
    return AVATAR_OPTIONS.find((avatar) => avatar.id === id);
}