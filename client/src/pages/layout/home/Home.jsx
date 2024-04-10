import Container from "@Components/container/Container";
import Header from "./Header";
import LatestNews from "./LatestNews";
import UpcomingEvents from "./UpcomingEvents";
import Weekly from "./Weekly";
import Popular from "./Popular";

const Home = () => {
  return (
    <>
      <Container>
        <Header />
        <LatestNews />
        <UpcomingEvents />
        <Weekly />
        <Popular />
      </Container>
    </>
  );
};

export default Home;
