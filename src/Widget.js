import "./Widget.css";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Widget() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets_article">
      <div className="widgets_articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widgets_articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  return (
    <div className="widgets">
      <div className="widgets_header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newsArticle("React build linkedIn clone1", "Top news 1 - 9999 readers")}
      {newsArticle("React build linkedIn clone2", "Top news 2 - 9999 readers")}
      {newsArticle("React build linkedIn clone3", "Top news 3 - 9999 readers")}
      {newsArticle("React build linkedIn clone4", "Top news 4 - 9999 readers")}
    </div>
  );
}

export default Widget;
