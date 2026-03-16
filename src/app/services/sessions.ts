//guardar sesiones en Supabase
import { supabase } from '../lib/supabase'

export async function saveSessionDB(session: any, userId: string) {

    const { error } = await supabase
        .from('sessions')
        .insert([
            {
                user_id: userId,
                exercise: session.exercise,
                exercise_name: session.exerciseName,
                score: session.score,
                level: session.level,
                duration: session.duration
            }
        ])

    if (error) {
        console.error('Error guardando sesión:', error)
    } else {
        console.log('Sesión guardada en Supabase')
    }
}

//leer sesiones del usuario

export async function getUserSessions(userId: string) {

    const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error(error)
        return []
    }

    return data
}