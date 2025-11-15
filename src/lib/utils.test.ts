import { describe, expect, it } from "vitest"
import { removeTrailingSlash } from "./utils"

describe("removeTrailingSlash", () => {
  it.each<[string, string]>([
    ["/", "/"],
    ["/foo", "/foo"],
    ["/foo/", "/foo"],
    ["/foo///", "/foo"],
    ["/foo/bar", "/foo/bar"],
    ["/foo/bar/", "/foo/bar"],
    ["foo", "foo"],
    ["foo/", "foo"],
    ["", "/"],
    ["////", "/"],
    ["/#hash", "/#hash"],
    ["/#hash/", "/#hash"],
  ])('normalizes paths without query: "%s" → "%s"', (input, expected) => {
    const result = removeTrailingSlash(input)

    expect(result).toBe(expected)
  })

  it.each<[string, string]>([
    ["/?tab=1", "/?tab=1"],
    ["?tab=1", "/?tab=1"],
    ["/foo?tab=1", "/foo?tab=1"],
    ["/foo/?tab=1", "/foo?tab=1"],
    ["foo?tab=1", "foo?tab=1"],
    ["foo/?tab=1", "foo?tab=1"],
    ["/foo/?a=1&b=2", "/foo?a=1&b=2"],
    ["foo/bar/?a=1&b=2", "foo/bar?a=1&b=2"],
    ["/foo///bar////?a=1", "/foo///bar?a=1"],
    ["////?tab=1", "/?tab=1"],
    ["////?", "/"],
    ["/?tab=1#hash", "/?tab=1#hash"],
    ["?tab=1#hash", "/?tab=1#hash"],
    ["/foo/?tab=1#hash", "/foo?tab=1#hash"],
  ])('normalizes paths with query: "%s" → "%s"', (input, expected) => {
    const result = removeTrailingSlash(input)

    expect(result).toBe(expected)
  })
})
