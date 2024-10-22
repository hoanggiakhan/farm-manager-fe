// utils/auth.ts
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token; // Trả về true nếu token tồn tại
  };
  