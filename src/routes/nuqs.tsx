import type { CheckedState } from "@radix-ui/react-checkbox"
import { createFileRoute, useLocation } from "@tanstack/react-router"
import { CheckIcon, XIcon } from "lucide-react"
import { createStandardSchemaV1, parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import RefreshKBD from "@/components/refresh-kbd"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { removeTrailingSlash } from "@/lib/utils"

const tabParser = parseAsInteger.withDefault(1)

export const Route = createFileRoute("/nuqs")({
  component: App,
  validateSearch: createStandardSchemaV1({ tab: tabParser }, { partialOutput: true }),
})

function App() {
  const { href } = useLocation()
  const [tab, setTab] = useQueryState("tab", tabParser)
  const [shouldRemoveTrailingSlash, setShouldRemoveTrailingSlash] = useState<CheckedState>(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
  useEffect(() => {
    if (shouldRemoveTrailingSlash) {
      window.history.replaceState(null, "", removeTrailingSlash(href))
    }
  }, [tab, href, shouldRemoveTrailingSlash])

  function isCorrectHref() {
    const slashCount = href.split("/").length - 1
    return slashCount === 1
  }

  return (
    <>
      {!isCorrectHref() && (
        <div className="-translate-x-1/2 absolute bottom-12 left-1/2 space-y-1 text-center *:text-sm">
          <p className="flex items-center">
            Refresh (<RefreshKBD />) to turn <XIcon className="text-red-600" /> into{" "}
            <CheckIcon className="text-green-600" />
          </p>
          <p className="italic">(TR removes trailing slash)</p>
        </div>
      )}

      <div className="flex h-screen flex-col items-center justify-center gap-12">
        <div className="flex items-center gap-3">
          <Checkbox
            id="shouldRemoveTrailingSlash"
            checked={shouldRemoveTrailingSlash}
            onCheckedChange={setShouldRemoveTrailingSlash}
          />
          <Label htmlFor="shouldRemoveTrailingSlash">Remove trailing slash</Label>
        </div>

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
            <TabsContent key={value} value={value} className="mt-2 flex gap-4">
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
