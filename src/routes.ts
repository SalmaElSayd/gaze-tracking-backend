import {Request, Response, Router} from "express";
import * as firebase from "firebase";
import {BehaviorData, PostType} from "./types";

const shuffle = (arra1) => {
  let ctr = arra1.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1
};

export const routes = (
  app: Router,
  db?: firebase.database.Database
) => {
  db?.goOnline();

  app.get("/posts", async (req: Request, res: Response) => {
    // const data = await fs.readFileSync(`/Users/elena/Desktop/fake-news/facebook-ui/server/functions/src/files/posts.json`, "utf8")
    const posts = db?.ref("posts");
    posts?.once("value", (snapshot) => {
      const data = snapshot.val();
      const dataAsArray = Object.entries(data).map(([key, value]) => {
        if (
          // (value as PostType).id !== 'post-70'
          // && (value as PostType).id !== 'post-75'
          // && (value as PostType).id !== 'post-76'
          // && (value as PostType).id !== 'post-77'
          // && (value as PostType).id !== 'post-79'
          // && (value as PostType).id !== 'post-41'
          // && (value as PostType).id !== 'post-42'
          // && (value as PostType).id !== 'post-61'
          // && (value as PostType).id !== 'post-16'
          // && (value as PostType).id !== 'post-17'
          // && (value as PostType).id !== 'post-24'
          // && (value as PostType).id !== 'post-22'
          // && (value as PostType).id !== 'post-27'
          // && (value as PostType).id !== 'post-21'
          // && (value as PostType).id !== 'post-41'
          // && (value as PostType).id !== 'post-42'
          // && (value as PostType).id !== 'post-61'
          // && (value as PostType).id !== 'post-16'
          // && (value as PostType).id !== 'post-17'
          // && (value as PostType).id !== 'post-21'
          // && (value as PostType).id !== 'post-24'
          // && (value as PostType).id !== 'post-22'
          // && (value as PostType).id !== 'post-2'
          // && (value as PostType).id !== 'post-30'
          // && (value as PostType).id !== 'post-27'
          // && (value as PostType).id !== 'post-29'
          // && (value as PostType).id !== 'post-88'
          // && (value as PostType).id !== 'post-92'
          // && 
          (value as PostType).id !== 'post-105'
          // && (value as PostType).id !== 'post-36'
          // && (value as PostType).id !== 'post-44'
          // && (value as PostType).id !== 'post-45'
          // && (value as PostType).id !== 'post-50'
          // && (value as PostType).id !== 'post-59'
          // && (value as PostType).id !== 'post-57'
          // && (value as PostType).id !== 'post-60'
          // && (value as PostType).id !== 'post-56'
          // && (value as PostType).id !== 'post-73'
          ) {
          return {
            ...(value as PostType),
            reactions:
              (value as PostType).reactions &&
              Object.entries((value as PostType).reactions).map(([k, v]) => v),
          };
        }
        return null
      }).filter(item => !!item);
      res.send(shuffle(dataAsArray));
    });
    return;
  });

  app.post("/updatePost", async (req: Request, res: Response) => {
    console.log("API: /updatePost");
    db?.ref("posts").once("value", (snapshot) => {
      const data = snapshot.val();
      Object.entries(data).map(([key, value]) => {
        if ((value as PostType)?.id === req.body.id) {
          for (let i = 0; i < 5; i++) {
            db?.ref("posts/" + key + '/reactions').push({
              emoji: req.body.emoji,
              by: Math.random().toString(36).substring(7) + " " + Math.random().toString(36).substring(7)
            })
          }
        }
      });
    });
    res.send('Saved topic to ' + req.body.id + ': ' + req.body.emoji)
  });

  app.post("/addPost", async (req: Request, res: Response) => {
    console.log("API: /addPost");
    if (req.body.id) {
      const newPost = {
        ...req.body,
      };
      db?.ref("posts").push(newPost);
      res.send("saved");
    }
    return;
  });

  app.post("/addReactionToPost", async (req: Request, res: Response) => {
    console.log("API: /addReactionToPost", req.body.postId, req.body.reaction.by, req.body.reaction.emoji);
    if (req.body.postId) {
      db?.ref("posts").once("value", (snapshot) => {
        if (snapshot?.val()) {
          Object.entries(snapshot.val()).map(([key, value]) => {
            if ((value as PostType)?.id === req.body.postId) {
              if ((value as PostType).reactions) {
                Object.entries((value as PostType).reactions).map(([k, v]) => {
                  if (v.by === req.body.reaction.by) {
                    db?.ref("posts/" + key + "/reactions")
                      .child(k)
                      .remove();
                  }
                  if (
                    v.by === req.body.reaction.by &&
                    v.emoji !== req.body.reaction.emoji
                  ) {
                    db?.ref("posts/" + key + "/reactions").push(
                      req.body.reaction
                    );
                  }
                });
              } else {
                db?.ref("posts/" + key + "/reactions").push(req.body.reaction);
              }
            }
          });
        }
      });
    }
    res.send("Saved");
    return;
  });

  app.post("/createSession", async (req: Request, res: Response) => {
    console.log("API: /createSession");
    db?.ref("session/" + req.body.session).set({
      user: req.body.userId,
      browser: req.body.browser,
      browserVersion: req.body.browserVersion,
      sessionStart: new Date().getTime(),
      IPRemote: req.connection.remoteAddress ?? '',
      IP: req.headers['x-forwarded-for']
    });
    res.send("saved");
    return;
  });

  app.post("/saveData", async (req: Request, res: Response) => {
    console.log("API: /saveData");

    req.body.data.map((data: BehaviorData) => {
      Object.entries(data).map(([key, value]) => {
        db?.ref(
          "session/" + req.body.session.id + "/actionsPerTime/" + key
        ).set(value);
      });
    });
    res.send({message: "Saved!"});
    return;
  });

  app.post("/accuracyInfo", async (req: Request, res: Response) => {
    console.log("API: /accuracyInfo");
    db?.ref("session/" + req.body.session.id + "/accuracyInfo/").set(req.body.accuracyInfo);
    res.send({message: "Saved!"});
    return;
  });

  app.post("/validationChecks", async (req: Request, res: Response) => {
    console.log("API: /validationChecks");
    db?.ref("session/" + req.body.session.id + "/validationChecks/").set(req.body.validations);
    res.send({message: "Saved!"});
    return;
  });

  app.post("/surveyQuestions", async (req: Request, res: Response) => {
    console.log("API: /surveyQuestions");
    db?.ref("session/" + req.body.session.id + "/surveyQuestions/").set(req.body.surveyQuestions);
    res.send({message: "Saved!"});
    return;
  });
};
