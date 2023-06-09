import ContextMenuDemo from "./context-menu";

export default function Page() {
  return (
    <div className="m-4">
      <section className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl mb-2">OpenAI Translate-Prompt Demo</h1>
        <h2 className="text-xl mb-2 text-gray-700">
          Select some text, and right-click to open a context menu with language
          options. OpenAI will be prompted to translate the selected text into
          the chosen language.
        </h2>
      </section>

      <ContextMenuDemo>
        {/* Put arbitrary text here. */}
        <h3 className="text-xl">What is Nomad?</h3>

        <p className="my-2">
          Nomad is a flexible workload orchestrator that enables an organization
          to easily deploy and manage any containerized or legacy application
          using a single, unified workflow. Nomad can run a diverse workload of
          Docker, non-containerized, microservice, and batch applications.
        </p>
        <p className="my-2">
          Nomad enables developers to use declarative infrastructure-as-code for
          deploying applications. Nomad uses bin packing to efficiently schedule
          jobs and optimize for resource utilization. Nomad is supported on
          macOS, Windows, and Linux.
        </p>
        <p className="my-2">
          Nomad is widely adopted and used in production by PagerDuty, Target,
          Citadel, Trivago, SAP, Pandora, Roblox, eBay, Deluxe Entertainment,
          and more.
        </p>
      </ContextMenuDemo>
    </div>
  );
}
