import { useEffect, useState } from 'react';
import { Project } from '../Types/Project';
import { fetchBooks } from '../api/BooksAPI';

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Project[]>([]);
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchBooks(10, 1, []);
        setBooks(data.books);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) return <p>Loading Books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1>Admin - Books</h1>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>ISBN</th>
          <th>Classification</th>
          <th>Category</th>
          <th>Page Count</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {books.map((b) => (
          <tr key={b.bookId}>
            <td>{b.bookId}</td>
            <td>{b.title}</td>
            <td>{b.author}</td>
            <td>{b.publisher}</td>
            <td>{b.isbn}</td>
            <td>{b.classification}</td>
            <td>{b.category}</td>
            <td>{b.pageCount}</td>
            <td>{b.price}</td>
            <td>
              <button onClick={() => console.log(`Edit book ${b.bookId}`)}>
                Edit
              </button>
            </td>
            <td>
              <button onClick={() => console.log(`Delete book ${b.bookId}`)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default AdminBooksPage;
