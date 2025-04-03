import { Project } from '../Types/Project';

export interface fetchBooksResponse {
  books: Project[];
  totalNumProjects: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<fetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
      .join('&'); // changed from bookTypes to projectTypes

    const response = await fetch(
      `https://localhost:5000/Book/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${
        selectedCategories.length ? `&${categoryParams}` : ''
      }`,
      {
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const json = await response.json();

    // Map from backend field names (books, totalNumBooks) to what the component expects (projects, totalNumProjects)
    return {
      books: json.books,
      totalNumProjects: json.totalNumBooks,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
