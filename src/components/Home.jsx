import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../ui";
import { useNavigate } from "react-router-dom";
import { getArticlesStart, getArticleSuccess } from "../slice/article";
import ArticleService from "../service/article";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { articles, isLoading } = useSelector(state => state.article);
  const { loggedIn, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const getArticles = async () => {
    dispatch(getArticlesStart());
    try {
      const response = await ArticleService.getArticles();
      console.log(response);
      dispatch(getArticleSuccess(response.articles));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async slug => {
    try {
      await ArticleService.deleteArticle(slug); // Corrected here
      getArticles(); // Refresh the articles after deletion
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="album py-5 bg-body-tertiary">
        <div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {articles && articles.length > 0 ? (
              articles.map(item => (
                <div className="col" key={item.id}>
                  <div className="card shadow-sm h-100">
                    <svg
                      className="bd-placeholder-img card-img-top"
                      width="100%"
                      height="225"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder: Thumbnail"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                    >
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#55595c"></rect>
                    </svg>
                    <div className="card-body">
                      <p className="card-text fw-bold m-1">{item.title}</p>
                      <p className="card-text">{item.description}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          onClick={() => navigate(`/article/${item.slug}`)}
                          type="button"
                          className="btn btn-sm btn-outline-success"
                        >
                          View
                        </button>
                        {loggedIn && user?.username === item.author?.username && (
                          <>
                            <button onClick={() => navigate(`/edit-article/${item.slug}`)} type="button" className="btn btn-sm btn-outline-secondary">
                              Edit
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteArticle(item.slug)}>
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                      <small className="text-body-secondary fw-bold text-capitalize">{item.author?.username}</small>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No articles found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
