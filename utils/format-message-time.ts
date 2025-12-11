export function formatMessageTime(createdAt: string | Date): string {
    const now = new Date();
    const date = new Date(createdAt);

    const isToday =
        now.getFullYear() === date.getFullYear() &&
        now.getMonth() === date.getMonth() &&
        now.getDate() === date.getDate();

    if (isToday) {
        // Возвращаем время в формате HH:MM
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const diffDays = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 7) {
        // Возвращаем день недели, 3 буквы
        return date.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue, Wed ...
    }

    // Больше недели — возвращаем дату в формате DD.MM.YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы с 0
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}
