import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addFeed(res.data));
    } catch {
      navigate("/error");
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return null;
  if (feed.length === 0)
    return (
      <h1 className=" pt-10 flex items-center justify-center text-3xl text-red-400">
        {" "}
        Ohh! No User available on feed
      </h1>
    );
  return (
    feed && (
      <div className="flex items-center justify-center">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
