import { Button } from "@heroui/button";
import { useTheme } from "@heroui/use-theme";
import { button as buttonStyles } from "@heroui/theme";
import { Input } from "@heroui/input";
import { Spacer } from "@heroui/spacer";
import { CardCodion } from "./components/Cardcodion";
import { GithubUser, UseGetUsers } from "./api/users";
import React, { useEffect, useState } from "react";
import { ModalError } from "./components/ModalError";

function App() {
  // fetch users
  const { data, error, isLoading, handleQueryChange, handleNextPage } = UseGetUsers()

  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleQueryChange(event.currentTarget.value)
    }
  };
  const [isSm, setIsSm] = useState(false);

  const handleResize = () => {
    window.innerWidth < 767 ? setIsSm(true) : setIsSm(false);
  }
  useEffect(() => {
    window.innerWidth < 767 ? setIsSm(true) : setIsSm(false);

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])
  const inputRef = React.createRef<HTMLInputElement>();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleNextPage();
      }
    }, {
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (data && data.pages.length > 0) {
      observer.observe(document.querySelector('.list-container')!);
    }

    return () => {
      observer.disconnect();
    };
  }, [data, handleNextPage]);

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="md:flex sm:flex-row gap-4 items-center">
        <Input ref={inputRef} label="Enter Username" onKeyDown={handleKeyDown} />
        {isSm && <Spacer y={4} />}
        <Button className={buttonStyles({
          color: "primary",
          radius: "full",
          variant: "shadow",
          fullWidth: isSm
        })} onPress={() => {
          handleQueryChange(inputRef.current?.value || '')
        }}>Search</Button>
      </div>
      <Spacer y={4} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!error && !isLoading && data && data.pages && data.pages.map((page) => {
          if (page.status) {
            return <ModalError content={page.message} title="Error" />
          }
          return page.items.map((item: GithubUser) => {
            return (
              <CardCodion key={item.login} githubUser={item} isSm={isSm} />
            )
          })

        })}


      </div>
      <div className="list-container"></div>
      {/* {isFetchingNextPage && <div>Loading next page...</div>} */}
    </div>
  );
}

export default App
