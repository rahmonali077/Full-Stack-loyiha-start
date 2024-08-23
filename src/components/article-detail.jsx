import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleService from "../service/article";
import { useDispatch, useSelector } from "react-redux";
import { getArticleDetailStart, getArticleDetailSuccess, getArticleDetailFailure } from "../slice/article"; 
import{Loader} from '../ui'

import moment from "moment";
import "./ArticleDetail.css";

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { articleDetail, error, isLoading} = useSelector(state => state.article);

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleService.getArticleDetail(slug);
        dispatch(getArticleDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticleDetailFailure());
      }
    };
    getArticleDetail();
  }, [slug, dispatch]);

  if (error) {
    return <div className="error">An error occurred while fetching the article details.</div>;
  }

  return isLoading ? (
     <Loader/> 
  ) : (
    articleDetail !== null && (
      <div>
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">{articleDetail?.title}</h1>
            <p className="col-md-8 fs-4">{articleDetail?.description}</p>
            <div>
              <p className="text-muted">
                <span className="fw-bold">Created at:</span> {moment(articleDetail.createdAt).format("DD, MMM, YYYY")}
              </p>
              <div className="col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary-emphasis">{articleDetail.author.username}</strong>
                    <p className="card-text mb-auto">{articleDetail.author.bio}</p>
                  </div>
                  <div className="col-auto d-none d-lg-block">
                    <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#55595c"></rect>
                      <text x="50%" y="50%" fill="#eceeef" dy=".3em">{articleDetail.author.username[0]}</text>
                    </svg>
                  </div>
                </div>
              </div>
              <div>{articleDetail.body}</div>
            </div>
          </div>
        </div>
      </div>
  )
    )
}

export default ArticleDetail;
