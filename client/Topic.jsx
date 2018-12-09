import React from "react";

class Topic extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <article className="pv4 bt bb b--black-10 ph3 ph0-l">
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-60-ns pr3-ns order-2 order-1-ns">
              <h1 className="f3 athelas mt0 lh-title">
                Where did you go over the weekend?
              </h1>
              <p className="f5 f4-l lh-copy athelas">
                What did you do there? Who did you go there with?
              </p>
              <p className="f5 f4-l lh-copy athelas">
                您這個週末去哪裡？ 跟誰一起去？ 做些什麼？
              </p>
            </div>
          </div>
          <p className="f6 lh-copy gray mv0">
            <span className="ttu">Unit 4 Lesson 3</span>
          </p>
        </article>

        <article className="pv4 bt bb b--black-10 ph3 ph0-l">
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-60-ns pr3-ns order-2 order-1-ns">
              <h1 className="f3 athelas mt0 lh-title">
                What is your favorite class in school? Why?
              </h1>
              <p className="f5 f4-l lh-copy athelas">
                What do you like to study? Who is your favorite teacher?
              </p>
              <p className="f5 f4-l lh-copy athelas">
                您最喜歡讀什麼書？ 您最喜歡的老師是誰？
              </p>
            </div>
          </div>
          <p className="f6 lh-copy gray mv0">
            <span className="ttu">Unit 4 Lesson 3</span>
          </p>
        </article>
      </React.Fragment>
    );
  }
}

export default Topic;
