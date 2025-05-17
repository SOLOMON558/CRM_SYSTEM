interface UserFilters { 
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    isBlocked?: boolean;
    limit?: number;  // сколько на странице
    offset?: number;  // страницу
  }