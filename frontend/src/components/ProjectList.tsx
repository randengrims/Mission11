import { useEffect, useState } from 'react';
import { Project } from '../Types/Project';
import { useNavigate } from 'react-router-dom';

interface ProjectApiResponse {
  projects: Project[];
  totalNumProjects: number;
}

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortAsc, setSortAsc] = useState<boolean>(true); // Sorting direction
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join('&'); // This might be the thing that doesnt work. Switch to 'projectTypes'

      const response = await fetch(
        `https://localhost:5000/Book/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
        {
          credentials: 'include',
        }
      );

      const data: ProjectApiResponse = await response.json();

      const sortedBooks = [...data.projects].sort((a: Project, b: Project) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (sortAsc) return titleA.localeCompare(titleB);
        else return titleB.localeCompare(titleA);
      });

      setBooks(sortedBooks);
      setTotalItems(data.totalNumProjects);
      setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
    };

    fetchProjects();
  }, [pageSize, pageNum, sortAsc, selectedCategories]);

  const toggleSort = () => {
    setSortAsc(!sortAsc);
  };

  return (
    <>
      <button onClick={toggleSort}>Sort by Title {sortAsc ? '▲' : '▼'}</button>
      <br />
      <br />

      {books.map((b) => (
        <div id="projectCard" className="card" key={b.bookId}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
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
                <strong>Classification/Category:</strong> {b.classification} /{' '}
                {b.category}
              </li>
              <li>
                <strong>Number of Pages:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${b.price}
              </li>
            </ul>

            <button
              className="btn btn-success"
              onClick={() => navigate(`/addtocart/${b.title} / ${b.bookId}`)}
            >
              Add to Cart
            </button>
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
