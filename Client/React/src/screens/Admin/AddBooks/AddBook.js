import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Convert } from "../../../helpers/ImageConverter";

class AddBoks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      isbn: "",
      author: "",
      category: "",
      numOfPages: "",
      price: "",
      image: "",
      authors: [],
      categories: [],
      status: false,
      message: "",
      imgmsg: "",
    };
  }
  async componentDidMount() {
    await axios
      .get("http://localhost:8081/author", {
        withCredentials: true,
      })
      .then((res) => {
        this.setState({ authors: res.data });
      })
      .catch((e) => {
        this.setState({ message: e.message });
        console.log(e);
      });
    await axios
      .get("http://localhost:8081/category", {
        withCredentials: true,
      })
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch((e) => {
        this.setState({ message: e.message });
        console.log(e);
      });
  }
  render() {
    const submitBook = async (e) => {
      e.preventDefault();
      await axios
        .post("http://localhost:8081/books", this.state, {
          withCredentials: true,
        })
        .then((res) => {
          this.setState({ status: res.data.status });
          this.setState({ message: res.data.message });
        })
        .catch((e) => {
          this.setState({ status: false });
          this.setState({ message: e.message });
          console.log(e);
        });
      if (this.state.status) {
        this.props.history.push("/addBookSuccess");
      }
    };
    return (
      <div>
        <form className="form" onSubmit={submitBook}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              onChange={(e) => {
                this.setState({ title: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <input
              name="isbn"
              placeholder="ISBN"
              required
              onChange={(e) => {
                this.setState({ isbn: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <select
              required
              value={this.state.author}
              onChange={(e) => {
                this.setState({ author: e.target.value });
              }}
              className="form-control"
              style={{
                marginBottom: "10px",
                marginTop: "6px",
                padding: "2px",
                height: "37px",
                width: "288px",
                backgroundColor: "#f3f3f3",
                borderRadius: "4px",
                transition: "all 250ms ease-in-out",
              }}
            >
              <option style={{ backgroundColor: "#b1b6bb" }} value="" disabled>
                Select Author
              </option>
              {this.state.authors.map((author) => (
                <option key={author._id} value={author.author}>
                  {author.author}
                </option>
              ))}
              <option
                style={{ backgroundColor: "#b1b6bb" }}
                value="noAuthor"
                disabled
              >
                Others? Add Author from Header...
              </option>
            </select>
          </div>
          <div className="form-group">
            <select
              required
              value={this.state.category}
              onChange={(e) => {
                this.setState({ category: e.target.value });
              }}
              className="form-control"
              style={{
                marginBottom: "10px",
                marginTop: "6px",
                padding: "2px",
                height: "37px",
                width: "288px",
                backgroundColor: "#f3f3f3",
                borderRadius: "4px",
              }}
            >
              <option style={{ backgroundColor: "#b1b6bb" }} value="" disabled>
                Select Category
              </option>
              {this.state.categories.map((category) => (
                <option key={category._id} value={category.category}>
                  {category.category}
                </option>
              ))}
              <option
                style={{ backgroundColor: "#b1b6bb" }}
                value="noCategory"
                disabled
              >
                Others? Add Category from Header...
              </option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="number"
              name="numOfPages"
              placeholder="No Of Pages"
              required
              onChange={(e) => {
                this.setState({ numOfPages: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              step="any"
              name="price"
              placeholder="Price"
              required
              onChange={(e) => {
                this.setState({ price: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label style={{ marginBottom: "0" }}>Book Image</label>
            <input
              type="file"
              name="img"
              placeholder="Image"
              required
              accept=".jpg,.png,.jpeg|image/*"
              onChange={async (e) => {
                try {
                  const convertedImage = await Convert(e.target.files[0]);
                  if (convertedImage) {
                    this.setState({ image: convertedImage });
                  } else {
                    this.setState({
                      imgmsg:
                        "The file is not in format of image/jpeg or image/png",
                    });
                  }
                } catch (error) {
                  this.setState({
                    imgmsg: error.message,
                  });
                }
                // this.setState({ image: e.target.files[0] });
                // console.log(this.state.image);
              }}
              style={{ width: "200px", paddingTop: "3px", marginTop: "0" }}
            />
            <p>{this.imgmsg}</p>
          </div>
          <div className="form-group">
            <button
              type="submit"
              style={{ margin: "10px 10px 0 0" }}
              className="btn btn-secondary"
            >
              ADD/UPDATE
            </button>
          </div>
          <p>{this.state.message}</p>
        </form>
      </div>
    );
  }
}

export default withRouter(AddBoks);
