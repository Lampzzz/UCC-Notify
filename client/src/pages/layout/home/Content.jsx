import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useGetAnnouncementQuery } from "@Services/redux/api/announcementApiSlice";
import Container from "@Components/container/Container";
import SectionContainer from "@Components/container/SectionContainer";
import Trending from "@Components/container/Trending";
import TrendingActicle from "./TrendingActicle";
import Comment from "./Comment";
import Popular from "./Popular";

const Content = () => {
  const { id } = useParams();
  const { data, refetch, isLoading } = useGetAnnouncementQuery(id);
  const [announcement, setAnnouncement] = useState();

  useEffect(() => {
    if (data) {
      setAnnouncement(data);
    }
  }, [data]);

  return (
    <Container>
      <SectionContainer>
        <Trending />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="row mb-5">
              <div className="col-12 col-md-8">
                {announcement && (
                  <>
                    <div className="bookmark__container">
                      <img
                        src={`http://localhost:3000/image/${announcement.image}`}
                        className="header__img rounded-3"
                        alt={announcement.title}
                      />
                      <div className="bookmark__icon">
                        <FaRegBookmark size={30} color="#" />
                      </div>
                    </div>
                    <h4 className="fw-semibold mt-4 mb-3">
                      {announcement.title}
                    </h4>
                    <p className="mb-5 text-black-50">{announcement.content}</p>
                  </>
                )}
              </div>
              <div className="col-12 col-md-4">
                <TrendingActicle />
                <Comment />
              </div>
            </div>
            {/* <Popular /> */}
          </>
        )}
      </SectionContainer>
    </Container>
  );
};

export default Content;
