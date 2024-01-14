import type { Signal } from "@builder.io/qwik";
import { $, component$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { server$ } from "@builder.io/qwik-city";
import { useAuthSession } from "~/routes/plugin@auth";
import { ChatPane } from "./interview/chat-pane";
import { MoreCredits } from "./interview/more-credits";
import { TutorInterviewPane } from "./interview/tutor-interview-pane";
import { UserInterviewPane } from "./interview/user-interview-pane";
import { LEET_CODE_QUESTIONS } from "~/constants/leet-code-questions";
import { InterviewSelection } from "./interview/interview-selection";
import { ALGO_KATAS } from "~/constants/algo-kata";

export const Interview = component$((props: any) => {
  const isAwaitingMessageResponse = useSignal(false);
  const isAwaitingAudioResponse = useSignal(false);
  const emojiTalkingSpeed: number = 200;
  const isCoding = useSignal(true);
  const monacoEditor = useSignal<any>(null);
  const problemStarted = useSignal(false);
  const testQuestion = {
    name: "binary-tree-vertical-order-traversal",
    question: '<p>Given the <code>root</code> of a binary tree, return <em><strong>the vertical order traversal</strong> of its nodes&#39; values</em>. (i.e., from top to bottom, column by column).</p>\n\n<p>If two nodes are in the same row and column, the order should be from <strong>left to right</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/01/28/vtree1.jpg" style="width: 282px; height: 301px;" />\n<pre>\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> [[9],[3,15],[20],[7]]\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/01/28/vtree2-1.jpg" style="width: 462px; height: 222px;" />\n<pre>\n<strong>Input:</strong> root = [3,9,8,4,0,1,7]\n<strong>Output:</strong> [[4],[9],[3,0,1],[8],[7]]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n<img alt="" src="https://assets.leetcode.com/uploads/2021/01/28/vtree2.jpg" style="width: 462px; height: 302px;" />\n<pre>\n<strong>Input:</strong> root = [3,9,8,4,0,1,7,null,null,null,2,5]\n<strong>Output:</strong> [[4],[9,5],[3,0,1],[8,2],[7]]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n',
    templateCode: "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    vector<vector<int>> verticalOrder(TreeNode* root) {\n        \n    }\n};",
  };

  const messages: Signal<{ messageText: string; isUser: boolean; renderHtml?: boolean }[]> = useSignal([
    {
      messageText: "Hey! I'm your personal AI tutor. Here to help you ace technical interviews for any big tech company!",
      isUser: false,
    },
    { messageText: testQuestion.question, isUser: false, renderHtml: true },
  ]);
  const isEmojiTalking = useSignal(false);
  const isAudioPlaying = useSignal(false);
  const resetEmoji = $(() => {
    isEmojiTalking.value = false;
  });
  const session = useAuthSession();

  const playAudioChunk = $((chunk: any) => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    return new Promise<void>((resolve) => {
      isAudioPlaying.value = true;
      const blobChunks = [...chunk];
      const blob = new Blob(blobChunks, { type: "audio/mpeg" });
      const objectURL = URL.createObjectURL(blob);
      audio.src = objectURL;
      audio.play();

      audio.addEventListener("ended", () => {
        resolve();
      });
    });
  });

  const setupAudio = $(() => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    audio.addEventListener("ended", () => {
      isAwaitingAudioResponse.value = false;
      isAudioPlaying.value = false;
      resetEmoji();
    });
  });

  const generateServerSideAudio = server$(async function* (message: string, email: string) {
    const response = await fetch(`${process.env.API_URL}/api/ai/generate-audio?email=${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY ?? "",
      },
      body: JSON.stringify({ message: message }),
    });
    if (!response.body) throw new Error("Response body was null");

    const reader = response.body.getReader();
    let startTime = performance.now();
    const mainChunks: Uint8Array[] = [];
    let smallChunks: any = [];

    for (let index = 0; index < 100; index++) {
      const { done, value } = await reader.read();
      const processTime = performance.now() - startTime;

      if (processTime < 1000) {
        if (value !== undefined) {
          smallChunks.push(value);
        }
      } else {
        mainChunks.push(smallChunks);
        smallChunks = [];
        if (value !== undefined) {
          smallChunks.push(value);
        }
      }

      if (mainChunks.length > 0) {
        const uint8Array = [];
        for (const element of mainChunks[0]) {
          const smallChunks: any = element;
          const convertedArray = Array.from(smallChunks);
          uint8Array.push(convertedArray);
        }

        yield Promise.resolve(JSON.stringify({ blob: uint8Array }));
        mainChunks.shift();
      }

      startTime = performance.now();
      if (done) {
        if (smallChunks.length > 0) {
          mainChunks.push(smallChunks);

          const uint8Array = [];
          for (const element of mainChunks[0]) {
            const smallChunks: any = element;
            const convertedArray = Array.from(smallChunks);
            uint8Array.push(convertedArray);
          }

          yield Promise.resolve(JSON.stringify({ blob: uint8Array }));
          mainChunks.shift();
        }
        break;
      }
    }
  });

  const retrieveAudio = $(async (message: string) => {
    if (props.store.user.credits == 0) {
      alert("More credits required");
      return;
    }
    setupAudio();

    isAwaitingAudioResponse.value = true;
    const response = await generateServerSideAudio(message, session.value?.user?.email ?? "");
    for await (const chunk of response) {
      const backToArray = JSON.parse(chunk);
      const convertedArray = [];
      for (const element of backToArray["blob"]) {
        const backToUint8Array = new Uint8Array(element);
        convertedArray.push(backToUint8Array);
      }
      await playAudioChunk(convertedArray);
    }
  });

  const store = useStore({
    code: testQuestion.templateCode,
    interviewSettings: {
      isCodingInterview: true,
      targetRole: "big-tech",
    },
  });
  const updateCode = $((code: any) => {
    store.code = code;
  });

  const updateMessage = server$(async (newMessage: string) => {
    if (props.store.user.credits <= 0) {
      return { status: "error", message: "More credits required" };
    }
    messages.value = [...messages.value, { messageText: newMessage, isUser: true }];
    const conversationHistory = messages.value.map((message: any) => message.text).join("\n");
    const messageStructure = `Conversation History: ${conversationHistory}. \n User:${isCoding.value ? "\n question:" + newMessage + "code:" + store.code : newMessage}`;
    isAwaitingMessageResponse.value = true;
    const email = session.value?.user?.email;
    const response = fetch(`${process.env.API_URL}/api/ai/message?email=${email}`, {
      method: "POST",
      headers: {
        "x-api-key": process.env.API_KEY ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageStructure }),
    });
    return (await response).json();
  });

  const updateProblemFrequency = $((newFrequency: number) => {
    problemFrequency.value = newFrequency;
  });

  useVisibleTask$(async ({ track }) => {
    track(() => isAudioPlaying.value);
    if (isServer) {
      return;
    }
    if (!isAudioPlaying.value) {
      return;
    }
    const interval = setInterval(() => {
      isEmojiTalking.value = !isEmojiTalking.value;
    }, emojiTalkingSpeed);

    return () => clearInterval(interval);
  });

  const sendMessage = $(async (message: string) => {
    if (props.store.user.credits == 0) {
      alert("More credits required");
      return;
    }
    const input = document.getElementById("input") as HTMLInputElement;
    messages.value = [...messages.value, { messageText: message, isUser: true }];
    isAwaitingMessageResponse.value = true;
    input.value = "";

    try {
      const res = await updateMessage(message);
      if (res["status"] == "success") {
        const responseText = res["message"];
        isAwaitingMessageResponse.value = false;
        messages.value = [...messages.value, { messageText: responseText, isUser: false }];
        if (props.store.user.UserSettings.auto_play_audio) retrieveAudio(responseText);
        return;
      }
      alert(res["message"]);
    } catch (err) {
      console.error(err);
    }
  });

  const setIsAwaitingMessageResponse = $((newValue: boolean) => {
    isAwaitingMessageResponse.value = newValue;
  });

  const updateCodingInterview = $((newValue: boolean) => {
    store.interviewSettings.isCodingInterview = newValue;
    console.log(store.interviewSettings.isCodingInterview);
    isCoding.value = newValue;
  });

  const updateTargetRole = $((newValue: string) => {
    store.interviewSettings.targetRole = newValue;
  });

  const setMonacoEditor = $((monaco: any) => {
    monacoEditor.value = monaco;
  });

  const startTimeTrial = $(() => {
    problemStarted.value = true;
  });

  const rangeRef = useSignal<HTMLInputElement>();
  const rangeValue = useSignal<number>(150);
  const problemFrequency = useSignal(rangeValue.value);
  const generateProblem = $(() => {
    const newQuestion = LEET_CODE_QUESTIONS[Math.floor(Math.random() * problemFrequency.value)];
    console.log(newQuestion);
    messages.value = [
      {
        messageText: "Hey! I'm your personal AI tutor. Here to help you ace technical interviews for any big tech company!",
        isUser: false,
      },
      { messageText: newQuestion.question, isUser: false, renderHtml: true },
    ];
    store.code = newQuestion.templateCode;
    monacoEditor.value?.setValue(store.code);
  });

  const generateKata = $(() => {
    const newQuestion = ALGO_KATAS[Math.floor(Math.random() * ALGO_KATAS.length)];
    console.log(newQuestion);
    messages.value = [
      {
        messageText: "Hey! I'm your personal AI tutor. Here to help you ace technical interviews for any big tech company!",
        isUser: false,
      },
      { messageText: newQuestion.name + ": " + newQuestion.question, isUser: false, renderHtml: false },
    ];
    store.code = newQuestion.templateCode;
    monacoEditor.value?.setValue(store.code);
  });

  const restartInterview = $(() => {
    problemStarted.value = false;
  });

  return (
    <div class="w-full h-full flex justify-center p-4 gap-2">
      {!problemStarted.value ? <InterviewSelection rangeRef={rangeRef} startTimeTrial={startTimeTrial} rangeValue={rangeValue} generateProblem={generateProblem} generateKata={generateKata}></InterviewSelection> : null}
      {props?.store?.user?.credits == 0 ? <MoreCredits credits={props?.store?.user?.credits}></MoreCredits> : <div></div>}
      <ChatPane tataKaiMode={props.tataKaiMode} updateProblemFrequency={updateProblemFrequency} setMonacoEditor={setMonacoEditor} generateProblem={generateProblem} updateCode={updateCode} code={store.code} retrieveAudio={retrieveAudio} isCoding={isCoding} messages={messages} isAwaitingMessageResponse={isAwaitingMessageResponse} isAwaitingAudioResponse={isAwaitingAudioResponse} sendMessage={sendMessage}></ChatPane>
      <div>
        <TutorInterviewPane problemStarted={problemStarted.value} tataKaiMode={props.tataKaiMode} interviewSettings={store.interviewSettings} updateTargetRole={updateTargetRole} updateCodingInterview={updateCodingInterview} isEmojiTalking={isEmojiTalking}></TutorInterviewPane>
        <UserInterviewPane restartInterview={restartInterview} tataKaiMode={props.tataKaiMode} setIsAwaitingMessageResponse={setIsAwaitingMessageResponse} sendMessage={sendMessage} user={props?.store?.user}></UserInterviewPane>
      </div>
    </div>
  );
});
