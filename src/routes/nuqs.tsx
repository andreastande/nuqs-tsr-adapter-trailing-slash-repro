import { createFileRoute, useLocation } from "@tanstack/react-router"
import { CheckIcon, XIcon } from "lucide-react"
import { createStandardSchemaV1, parseAsInteger, useQueryState } from "nuqs"
import RefreshKBD from "@/components/refresh-kbd"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabParser = parseAsInteger.withDefault(1)

export const Route = createFileRoute("/nuqs")({
  component: App,
  validateSearch: createStandardSchemaV1(
    { tab: tabParser },
    { partialOutput: true },
  ),
})

function App() {
  const { href } = useLocation()
  const [tab, setTab] = useQueryState("tab", tabParser)

  function isCorrectHref() {
    const slashCount = href.split("/").length - 1
    return slashCount === 1
  }

  return (
    <>
      {!isCorrectHref() && (
        <div className="-translate-x-1/2 absolute bottom-12 left-1/2 space-y-1 text-center *:text-sm">
          <p className="flex items-center">
            Refresh (<RefreshKBD />) to turn <XIcon className="text-red-600" />{" "}
            into <CheckIcon className="text-green-600" />
          </p>
          <p className="italic">(TR strips trailing slash)</p>
        </div>
      )}

      <div className="flex h-screen flex-col items-center justify-center space-y-10">
        <Tabs
          defaultValue={String(tab)}
          onValueChange={(value) => setTab(Number(value))}
          className="items-center"
        >
          <TabsList>
            <TabsTrigger value="1">Tab 1</TabsTrigger>
            <TabsTrigger value="2">Tab 2</TabsTrigger>
            <TabsTrigger value="3">Tab 3</TabsTrigger>
          </TabsList>

          {["1", "2", "3"].map((value) => (
            <TabsContent key={value} value={value} className="flex gap-4">
              {href}
              {isCorrectHref() ? (
                <CheckIcon className="text-green-600" />
              ) : (
                <XIcon className="text-red-600" />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
