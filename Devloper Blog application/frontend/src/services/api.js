export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`/api${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMessage = "API Error";
    try {
      const data = await res.json();
      errorMessage = data.message || data.error || errorMessage;
    } catch (e) {}
    throw new Error(errorMessage);
  }

  return res.json();
};
