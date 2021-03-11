import "./notice.css";
import Bin from "../assets/bin.png";
import Edit from "../assets/pencil.png";
import Hero from "../assets/hero.jpg";

import { useContext, useEffect } from "react";
import { tokenContext } from "../context/tokenProvider";
import axios from "axios";
import { ADMIN_DELETE_NOTICE, VIEW_IMAGE, ADMIN_DELETE_IMAGE } from "../links";
import { NoticeListContext } from "../context/noticeListProvider";
import { NoticeContext } from "../context/noticeProvider";
import { Link } from "react-router-dom";

export default function Notice({ value }) {
  const [noticeList, setNoticeList] = useContext(NoticeListContext);
  const [notice, setNotice] = useContext(NoticeContext);
  const [token, useToken] = useContext(tokenContext);

  const dateParser = () => {
    const n = new Date(value.noticeDate);
    return n.toDateString();
  };

  const onClickDelete = async (event) => {
    event.preventDefault();

    var config = {
      method: "delete",
      url: ADMIN_DELETE_NOTICE + `?noticeId=${value.noticeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    await axios(config)
      .then(async function (response) {
        alert(response.data);
        if (
          notice.noticeImageLink != undefined &&
          notice.noticeImageLink != null
        ) {
          config = {
            method: "delete",
            url: ADMIN_DELETE_IMAGE + value.noticeImageLink,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };

          await axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="card">
      {/* <div className="image"> */}
      <img
        className="image"
        src={value.noticeImageLink ? VIEW_IMAGE + value.noticeImageLink : Hero}
        alt="play icon"
      />
      {/* </div> */}

      <div className="content">
        <h2 className="movie-title">{value.noticeTopic}</h2>
        <h4 className="date">{value.noticeIsMadeBy}</h4>
        <p className="date">{dateParser()}</p>
        <div className="synopsis">
          {value.noticeDescription}{" "}
          {value.noticeAttachmentLink ? (
            <a className="more" href={value.noticeAttachmentLink}>
              Attachment
            </a>
          ) : (
            <p></p>
          )}
        </div>

        {token ? (
          <div className="watch">
            <button className="btn" onClick={onClickDelete}>
              <span className="icon">
                <img src={Bin} alt="play icon" />
              </span>
            </button>
            <Link
              to="/createNew"
              className="btn"
              onClick={(e) => {
                setNotice(value);
              }}
            >
              <span className="icon">
                <img src={Edit} alt="movie icon" />
              </span>
            </Link>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
