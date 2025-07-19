const API_BASE_URL = 'http://localhost:3001/api';

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Content Management
  async getContent() {
    return this.request('/content');
  }

  async updateContent(id: string, data: { content: string; title?: string }) {
    return this.request(`/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async createContent(data: { section: string; key: string; content: string; title?: string; type?: string }) {
    return this.request('/content', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Image Management
  async uploadImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.request('/images/upload', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it with boundary
      body: formData,
    });
  }

  async getImages() {
    return this.request('/images');
  }

  async deleteImage(id: string) {
    return this.request(`/images/${id}`, {
      method: 'DELETE',
    });
  }

  // Appointment Management
  async getAppointments(filters: { status?: string; date?: string; limit?: number } = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });

    const queryString = params.toString();
    return this.request(`/appointments${queryString ? `?${queryString}` : ''}`);
  }

  async createAppointment(data: {
    customer_name: string;
    phone: string;
    email?: string;
    service: string;
    date: string;
    time: string;
    notes?: string;
  }) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAppointment(id: string, data: { status?: string; notes?: string }) {
    return this.request(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAppointment(id: string) {
    return this.request(`/appointments/${id}`, {
      method: 'DELETE',
    });
  }

  // System Status
  async getSystemStatus() {
    return this.request('/status');
  }
}

export const apiClient = new ApiClient();