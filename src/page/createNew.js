import React, { useState, useContext, useEffect } from "react";
import {
  ADMIN_CREATE_NOTICE,
  ADMIN_DELETE_IMAGE,
  ADMIN_UPDATE_NOTICE,
  ADMIN_UPLOAD_IMAGE,
  VIEW_IMAGE,
} from "../links";

import "./createNew.css";
import { tokenContext } from "../context/tokenProvider";
import { NoticeContext } from "../context/noticeProvider";
import axios from "axios";
import { useHistory } from "react-router-dom";
import FormData from "form-data";
import Spinner from "react-spinner-material";

export default function CreateNew() {
  const [image, setImage] = useState();
  const [imageError, setImageError] = useState("");
  const [imageFile, setImageFile] = useState();
  const [notice, setNotice] = useContext(NoticeContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState();

  useEffect(() => {
    if (
      notice.noticeImageLink !== undefined &&
      notice.noticeImageLink !== null
    ) {
      setImage(VIEW_IMAGE + notice.noticeImageLink);
      urlToObject(VIEW_IMAGE + notice.noticeImageLink);
    }
    if (Object.keys(notice).length !== 0)
      setValues({
        ...notice,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [values, setValues] = useState({
    noticeTopic: "",
    noticeDate: "",
    noticeImageLink: "",
    noticeIsMadeBy: "",
    noticeDescription: "",
    noticeAttachmentLink: "",
  });

  const [token] = useContext(tokenContext);

  const urlToObject = async (image) => {
    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });
    setImageFile(file);
  };

  const dateParser = () => {
    var d = new Date(values.noticeDate),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };

  const onImageChange = (event) => {
    if (!event.target.files || !event.target.files[0]) {
      setImageError("Please select image.");
      return;
    }
    if (!event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setImageError("Please select valid image.");
      return;
    }
    setImage(URL.createObjectURL(event.target.files[0]));
    setImageFile(event.target.files[0]);
    setImageError("");
  };

  const onAuthorChange = (event) => {
    event.persist();
    if (event.target.value.length >= 25) {
      return;
    }
    setValues((values) => ({
      ...values,
      noticeIsMadeBy: event.target.value,
    }));
  };

  const onDescriptionChange = (event) => {
    setValues((values) => ({
      ...values,
      noticeDescription: event.target.value,
    }));
  };

  const isUrl = (string) => {
    try {
      return Boolean(new URL(string));
    } catch (e) {
      return false;
    }
  };

  const onAttachMentChange = (event) => {
    if (event.target.value === "") {
      console.log(event.target.value);
      setIsValidUrl(true);
    } else if (!isUrl(event.target.value)) {
      setIsValidUrl(false);
    } else {
      setIsValidUrl(true);
    }

    setValues((values) => ({
      ...values,
      noticeAttachmentLink: event.target.value,
    }));
  };
  const onTopicChange = (event) => {
    if (event.target.value.length >= 35) {
      return;
    }
    setValues((values) => ({
      ...values,
      noticeTopic: event.target.value,
    }));
  };
  const onDateChange = (event) => {
    setValues((values) => ({
      ...values,
      noticeDate: event.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValidUrl === false) {
      return;
    }

    if (
      values.noticeDate.toString() === "" ||
      values.noticeIsMadeBy === "" ||
      values.noticeTopic === "" ||
      values.noticeDescription === ""
    ) {
      alert("You must fill all the input field with * symbol.");
      return;
    }

    setLoading(true);

    var data = new FormData();
    data.append("multipartFile", imageFile);

    var config = {
      method: "post",
      url: ADMIN_UPLOAD_IMAGE,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        config = {
          method: Object.keys(notice).length !== 0 ? "put" : "post",
          url:
            Object.keys(notice).length !== 0
              ? ADMIN_UPDATE_NOTICE
              : ADMIN_CREATE_NOTICE,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data:
            Object.keys(notice).length !== 0
              ? {
                  ...values,
                  noticeImageLink: response.data,
                }
              : {
                  noticeTopic: values.noticeTopic,
                  noticeDate: values.noticeDate,
                  noticeImageLink: response.data,
                  noticeIsMadeBy: values.noticeIsMadeBy,
                  noticeDescription: values.noticeDescription,
                  noticeAttachmentLink: values.noticeAttachmentLink,
                },
        };

        ///New entry creating ....

        axios(config)
          .then(async function (response) {
            alert(response.data);
            ///Now deleting the previous Image
            if (
              notice.noticeImageLink !== undefined &&
              notice.noticeImageLink !== null
            ) {
              config = {
                method: "delete",
                url: ADMIN_DELETE_IMAGE + notice.noticeImageLink,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              };

              await axios(config)
                .then(function (response) {
                  //console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                  //console.log(error);
                });
            }
            window.location.reload();
          })
          .catch(function (error) {
            alert("Action Failed. Try Again");
          });
      })
      .catch(function (error) {
        // console.log(error);
        config = {
          method: Object.keys(notice).length !== 0 ? "put" : "post",
          url:
            Object.keys(notice).length !== 0
              ? ADMIN_UPDATE_NOTICE
              : ADMIN_CREATE_NOTICE,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data:
            Object.keys(notice).length !== 0
              ? {
                  ...values,
                }
              : {
                  noticeTopic: values.noticeTopic,
                  noticeDate: values.noticeDate,
                  noticeIsMadeBy: values.noticeIsMadeBy,
                  noticeDescription: values.noticeDescription,
                  noticeAttachmentLink: values.noticeAttachmentLink,
                },
        };
        axios(config)
          .then(function (response) {
            alert(response.data);
            history.go(0);
          })
          .catch(function (error) {
            alert("Task Failed.");
          });
      });
  };

  return loading ? (
    <div className="center">
      <Spinner radius={30} color={"black"} stroke={2} visible={true} />
    </div>
  ) : (
    <div className="create-new">
      <p style={{ color: "gray" }}>Inputs with * symbol must be filled.</p>
      <p> Author*</p>
      <input
        className="create-new_input"
        placeholder="Author"
        value={values.noticeIsMadeBy}
        onChange={onAuthorChange}
      />
      <p> Topic* </p>
      <input
        className="create-new_input"
        placeholder="Topic"
        id="Topic"
        onChange={onTopicChange}
        value={values.noticeTopic}
      />

      <p> Attachment Link </p>
      <input
        className="create-new_input"
        placeholder="Attachment Link"
        id="Attachment Link"
        onChange={onAttachMentChange}
        value={values.noticeAttachmentLink}
      />
      {!isValidUrl ? (
        <p style={{ color: "red", fontSize: "15px", margin: 0 }}>
          Link not valid
        </p>
      ) : (
        <p></p>
      )}
      <p> Notice Details* </p>
      <textarea
        name="textarea"
        className="create-new_input"
        placeholder="Notice Details"
        style={{ height: "200px" }}
        onChange={onDescriptionChange}
        cols="20"
        value={values.noticeDescription}
        id="Notice Details"
      ></textarea>
      <p>Date*</p>
      <input
        type="date"
        className="create-new_input"
        placeholder="Issue Date"
        value={dateParser()}
        onChange={onDateChange}
        id="Issue Date"
      />

      <label class="custom-file-upload">
        <input
          type="file"
          accept="image"
          onChange={onImageChange}
          className="custom-file-upload"
        />
        Upload Image
      </label>

      <img id="target" src={image} style={{ width: "230px" }} alt="" />
      <p style={{ color: "red" }}>{imageError}</p>

      <button
        className="btn create-new_input"
        style={{ margin: "20px 0", textAlign: "center", color: "#222" }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
