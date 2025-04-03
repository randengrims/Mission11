import { useEffect, useState } from 'react';
import { Project } from '../Types/Project';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';

interface ProjectApiResponse {
  // Delete this code block if necessary. Not in vids, just bootstrap i think
  projects: Project[];
  totalNumProjects: number;
}

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortAsc, setSortAsc] = useState<boolean>(true); // Sorting direction
  const navigate = useNavigate();
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);

        // const sortedBooks = [...data.projects].sort(
        //   (a: Project, b: Project) => {
        //     const titleA = a.title.toLowerCase();
        //     const titleB = b.title.toLowerCase();
        //     if (sortAsc) return titleA.localeCompare(titleB);
        //     else return titleB.localeCompare(titleA);
        //   }
        // );
        console.log('API response:', data); // chat added
        console.log('books:', data.books); // chat added

        if (data.books) {
          setBooks(data.books);
        } else {
          console.error('⚠️ data.books is undefined!', data);
        }
        // this was sortedBooks from above
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [pageSize, pageNum, sortAsc, selectedCategories]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error {error}</p>;

  const toggleSort = () => {
    setSortAsc(!sortAsc);
  };

  return (
    <>
      <button onClick={toggleSort}>Sort by Title {sortAsc ? '▲' : '▼'}</button>
      <br />
      <br />

      {books.map((b) => (
        <div
          className="accordion mb-3"
          id={`accordion-${b.bookId}`}
          key={b.bookId}
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id={`heading-${b.bookId}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${b.bookId}`}
                aria-expanded="false"
                aria-controls={`collapse-${b.bookId}`}
              >
                {b.title}
              </button>
            </h2>
            <div
              id={`collapse-${b.bookId}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading-${b.bookId}`}
              data-bs-parent={`#accordion-${b.bookId}`}
            >
              <div className="accordion-body">
                <ul className="list-unstyled">
                  <li>
                    <strong>Author:</strong> {b.author}
                  </li>
                  <li>
                    <strong>Publisher:</strong> {b.publisher}
                  </li>
                  <li>
                    <strong>ISBN:</strong> {b.isbn}
                  </li>
                  <li>
                    <strong>Category:</strong> {b.classification} / {b.category}
                  </li>
                  <li>
                    <strong>Pages:</strong> {b.pageCount}
                  </li>
                  <li>
                    <strong>Price:</strong> ${b.price}
                  </li>
                </ul>
                <button
                  className="btn btn-success mt-2"
                  onClick={() =>
                    navigate(`/addtocart/${b.title}/${b.bookId}/${b.price}`)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default ProjectList;
