import axios from "axios";
import { useEffect, useContext, useState } from "react";
import Notice from "../components/notice";
import {
  ADMIN_CURRENT_NOTICES,
  ADMIN_SEARCH_NOTICES,
  CURRENT_NOTICES,
  SEARCH_NOTICES,
} from "../links";
import "./noticeList.css";
import { tokenContext } from "../context/tokenProvider";
import { NoticeListContext } from "../context/noticeListProvider";
import Forward from "../assets/forward.png";
import Backward from "../assets/backward.png";
import Spinner from "react-spinner-material";

export default function NoticeList() {
  const [token] = useContext(tokenContext);
  const [noticeList, setNoticeList] = useContext(NoticeListContext);
  const [onSearchStage, setOnSearchStage] = useState(false);
  var [page, setPage] = useState(0);

  const [loading, setLoading] = useState(true);

  const updateNoticeList = () => {
    var config = {
      method: "get",
      url: (token ? ADMIN_CURRENT_NOTICES : CURRENT_NOTICES) + `${page}`,
      headers: {
        Authorization: token ? "Bearer " + token : undefined,
      },
    };
    axios(config)
      .then(function (response) {
        setNoticeList(
          response.data.sort(
            (a, b) => new Date(b.noticeDate) - new Date(a.noticeDate)
          )
        );
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    updateNoticeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickForWard = (e) => {
    e.persist();
    setPage(++page);
    updateNoticeList();
  };

  const OnClickBackWard = (e) => {
    e.persist();
    if (page - 1 === -1) return;
    setPage(--page);
    updateNoticeList();
  };

  const OnChangeSearch = (e) => {
    if (e.target.value !== "") {
      console.log(e.target.value);
      var config = {
        method: "get",
        url: (token ? ADMIN_SEARCH_NOTICES : SEARCH_NOTICES) + e.target.value,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? "Bearer " + token : undefined,
        },
      };

      // console.log(config);
      axios(config)
        .then(function (response) {
          setNoticeList(
            response.data.sort(
              (a, b) => new Date(b.noticeDate) - new Date(a.noticeDate)
            )
          );
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      setOnSearchStage(true);
    } else {
      window.location.reload();
    }
  };

  return loading ? (
    <div className="center">
      <Spinner radius={30} color={"black"} stroke={2} visible={true} />
    </div>
  ) : (
    <div className="noticeList">
      <input
        type="text"
        name="search"
        placeholder="Search.."
        id="noticeList-input"
        onChange={OnChangeSearch}
      />

      {noticeList === undefined || noticeList.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>Sorry! Nothing Found :(</h1>
      ) : (
        <p></p>
      )}
      {noticeList.map((element) => (
        <Notice key={element.noticeId.toString()} value={element} />
      ))}

      {onSearchStage ? (
        <p></p>
      ) : (
        <div className="watch">
          <h4 className="date">Page No {page + 1}</h4>

          <button className="btn" onClick={OnClickBackWard}>
            <span className="icon">
              <img src={Backward} alt="play icon" />
            </span>
          </button>
          <button className="btn" onClick={onClickForWard}>
            <span className="icon">
              <img src={Forward} alt="play icon" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
