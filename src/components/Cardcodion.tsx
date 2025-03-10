import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from '@heroui/skeleton';
import { Accordion, AccordionItem } from "@heroui/accordion";
import React, { JSX, useEffect, useState } from "react";
import { GithubUser } from "../api/users";
import { UseGetUsersRepo, GithubRepoResponse } from "../api/userRepo";
type CardCodionProps = {
  githubUser: GithubUser
  isSm: boolean
}

export const CardCodion: React.FC<CardCodionProps> = ({ githubUser }) => {
  const card = (item: GithubRepoResponse) => (
    <Card key={item.id} style={{ overflowWrap: "anywhere" }}>
      <CardHeader className="flex gap-3 text-wrap space-between">
        <div className="flex flex-col flex-grow">
          <p className="text-md">{item.name}</p>
          <a href={item.html_url} target="_blank"><p className="text-small text-default-500">{item.html_url}</p></a>
        </div>
        <div className="self-start flex flex-row">{item.stargazers_count}<i className="material-icons" style={{ color: `${item.stargazers_count > 0 ? "yellow" : "black"}` }}>star</i></div>
      </CardHeader>

      <CardBody>
        <p>{item.description}</p>
      </CardBody>

      <CardFooter>

      </CardFooter>
    </Card>
  )



  let [colSpanClass, setColSpanClass] = useState<string>("lg:col-span-1")
  let [gridClass, setGridClass] = useState<string>("grid grid-cols-4 gap-4 grid-auto-flow")


  const [cards, setCards] = useState<Array<JSX.Element>>([])
  const { data, isLoading, refetch } = UseGetUsersRepo(githubUser.login)
  const fetchData = async () => {
    await refetch()
  }

  useEffect(() => {
    if (data) {
      setCards(data.map((item) => card(item)))
      switch (data.length) {
        case 1:
          setColSpanClass("lg:col-span-1")
          setGridClass("grid lg:grid-cols-1 gap-4 grid-auto-flow")
          break;
        case 2:
          setColSpanClass("xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-1")
          setGridClass("grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 grid-auto-flow")
          break;
        case 3:
          setColSpanClass("xl:col-span-3 lg:col-span-3 md:col-span-2 sm:col-span-1")
          setGridClass("grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 grid-auto-flow")
          break;
        default:
          setColSpanClass("xl:col-span-4 lg:col-span-3 md:col-span-2 sm:col-span-1")
          setGridClass("grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 grid-auto-flow")
          break;
      }
    }
  }, [data])

  return (
    <div className={`${colSpanClass}`}>
      <Accordion onSelectionChange={fetchData}>
        {isLoading ? (
          <AccordionItem title={githubUser.login}>
            <Card>
              <CardHeader>
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                </Skeleton>
              </CardHeader>
              <CardBody>
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-default-300" />
                </Skeleton>
              </CardBody>
            </Card>
          </AccordionItem>
        ) : (<AccordionItem title={githubUser.login}>
          <div className={gridClass}>
            {cards}
          </div>
        </AccordionItem>)}
      </Accordion>
    </div>
  )
}
