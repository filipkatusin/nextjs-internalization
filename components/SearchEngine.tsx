import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
} from "react-instantsearch-dom";
import React from "react";
import algoliasearch from "algoliasearch";
import { connectStateResults } from "react-instantsearch-dom";
import Link from "next/link";

function Hit(props) {
  const id = props.hit.objectID.substring(0, 7);

  return id == "collect" ? (
    <Link href={"/kolekcie/" + props.hit.slug}>
      <a>
        <div className="dataItem  z-80 flex">
          <div style={{ color: "rgba(0,0,0,0.34)" }} className="mr-2">
            Kolekcie:
          </div>
          <Highlight attribute="title" hit={props.hit} />
        </div>
      </a>
    </Link>
  ) : null;
}

export default function SearchEngine() {
  const algoliaClient = algoliasearch(
    "A9DDAIIZB1",
    "520a6397d9e47cbec04ee42491a1f615"
  );

  const searchClient = {
    search(requests) {
      if (!requests[0].params.query) {
        return [];
      }
      return algoliaClient.search(requests);
    },
  };

  const Results = connectStateResults(({ searchState }) =>
    searchState && searchState.query ? (
      <div className="searchResult shadow-2xl">
        <Hits hitComponent={Hit} />
      </div>
    ) : null
  );

  return (
    <div>
      <InstantSearch indexName="sportzoo" searchClient={searchClient}>
        <div className="dataResult">
          <SearchBox />
          {/*<Pagination />*/}
        </div>
        <div className="clear-right">
          <Results />
        </div>
      </InstantSearch>
    </div>
  );
}
