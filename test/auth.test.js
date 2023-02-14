import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment,
  } from "@firebase/rules-unit-testing"

  import firebaseApp from './plugins/firebase';

    let testEnv= await initializeTestEnvironment({
        projectId: "securityprojectdi5tb",
        firestore: {
            rules: fs.readFileSync("firestore.rules", "utf8"),
            },
    });



