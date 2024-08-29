"use client";

export const getSession = async () => {
    try {
        const res = await fetch('/api/session');
        const session = await res.json();
        return session;
    } catch (error) {
        console.error('Error fetching session:', error);
    }
};
