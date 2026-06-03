import videoHomePage from "../../assets/video-homepage.mp4";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="home-title">The form is only the beginning</div>
        <div className="home-body">
          Collect, analyze, and act on customer data with the complete platform
          for AI forms & workflows.
        </div>
        <button className="home-btn">Get started—it's free</button>
      </div>
    </div>
  );
};

export default HomePage;
