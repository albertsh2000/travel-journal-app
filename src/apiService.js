import { toast } from "react-toastify";

class ApiService {
  async request(url, options = {}) {
    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        const message = `backend error ${res.status} ${res.statusText}`;
        toast.error(message);
        throw new Error(message);
      }

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await res.json();
      }

      return res;
    } catch (error) {
      throw error;
    }
  }

  get(url) {
    return this.request(url);
  }

  post(url, body) {
    return this.request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  delete(url) {
    return this.request(url, {
      method: "DELETE",
    });
  }
}

export default new ApiService();
