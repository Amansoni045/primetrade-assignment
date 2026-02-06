export async function getAuthenticatedUser(token: string) {
    try {
        const res = await fetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}
