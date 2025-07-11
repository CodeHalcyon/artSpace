export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  try {
    const res = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("access", data.access);
      return data.access;
    } else {
      localStorage.clear(); // tokens are bad → logout user
      return null;
    }
  } catch (err) {
    console.error("Token refresh failed", err);
    return null;
  }
}
