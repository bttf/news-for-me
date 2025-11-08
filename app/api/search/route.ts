import { NextRequest } from "next/server";

/**
 * this will accept a POST request containing a search query and a list of selected publications
 * it will perform a google search with site: operator for each selected publication
 * and return the search results grouped by publication
 */

export const POST = async (request: NextRequest) => {};
