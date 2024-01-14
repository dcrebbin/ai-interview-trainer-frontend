# Up It APS

Up It APS is an AI powered interview trainer for the Australian Public Service.

https://www.upitaps.com.au **(Closed ALPHA)**

However it has recently been pivoted towards tech specific coding interviews

**DEMO:** https://www.youtube.com/watch?v=ef2ivitjiBU

*Backend:* https://github.com/dcrebbin/ai-interview-trainer-backend

### Technology:

- Frontend: [Qwik](https://qwik.builder.io/)

- Backend: [Go Fiber](https://docs.gofiber.io/)

- Database: [MySQL with GORM](https://gorm.io/index.html)

- Vector Database: [Pinecone](https://www.pinecone.io) (Not currently leveraged really)

### Default Hosting:

These are the providers I personally use to deploy everything, ofc can be interchanged to your preferences, but these work.

- Frontend: [Vercel (using VITE)](https://vercel.com/)

- Backend: [Google Cloud Platform](https://console.cloud.google.com/)

- Database: [PlanetScale](https://app.planetscale.com/)

- Vector Database: [Pinecone](https://www.pinecone.io/) (Not currently leveraged really)

### Integrated AI Services:
*Note: Vertex isn't fully supported and requires manual regeneration of the auth token on the backend (very sus): Mostly bc the other providers are better, sorry google (would be worth it if you have heaps of gcp credits or a partnership tho)*

#### Text Generation:

- [OpenAi (GPT3.5, GPT4 etc)](https://platform.openai.com/docs/api-reference/chat)  (GPT4 Turbo is the best of both worlds)

- [Vertex (Palm, Gemini Pro etc)](https://console.cloud.google.com/vertex-ai/generative) (Maybe ultra will be insane but idk)

#### Text to Speech:
- [OpenAi (TTS 1, TTS 1 HD)](https://platform.openai.com/docs/api-reference/audio/createSpeech)  (Best of both worlds)
- [Vertex](https://console.cloud.google.com/vertex-ai/generative)
- [ElevenLabs](https://elevenlabs.io/docs/api-reference/text-to-speech) (Most expensive and the slowest but the highest quality)
- [Unreal Speech](https://docs.unrealspeech.com/) (Cheapest and the quickest but slightly uncanny valley)

#### Speech to Text:
*Both are pretty decent, whisper's probably a bit cheaper tho*
- [OpenAi (Whisper 1)](https://platform.openai.com/docs/api-reference/audio/createTranscription)
- [Vertex](https://console.cloud.google.com/vertex-ai/generative)
## Setup 

1) npm i

2) Create a local.env to match the example.env

3) Setup and run the API

4) Start-up the frontend!