import React from "react";
import { Upload, Icon, message } from "antd";
import { type } from "util/common";
import { uploadProductImg } from "service/product";
import "./upload.scss";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      subImg: "",
      imgList: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({imgList:nextProps.imgList})
  }
  handleChange(info) {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file, imageUrl => {
        this.setState(
          {
            loading: false,
            imageUrl,
            subImage: info.subImage
          },
          () => {
            this.onPropsImgChange();
          }
        );
      });
    }
  }
  async customRequest(info) {
    let form = new FormData();
    form.append("upload_file", info.file);
    let res = await uploadProductImg(form);
    if (res.status === 0) {
      info.file.status = 'done';
      info.subImage = {
        uri: res.data.uri,
        url: res.data.url
      };
      this.handleChange(info)
    }
  }
  onPropsImgChange() {
    let imgChangeable = type(this.props.onImgChange) === "function";
    if (imgChangeable) {
      this.props.onImgChange(this.state.subImage);
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="upload_file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        defaultFileList={[...this.state.imgList]}
        customRequest={info => this.customRequest(info)}
        onChange={info => this.handleChange(info)}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}
export default Avatar;
