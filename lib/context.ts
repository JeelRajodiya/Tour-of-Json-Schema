import React from "react";

export const pageContext = React.createContext<
    Readonly<{
        pageName: string | null;
        setPageName: React.Dispatch<React.SetStateAction<string | null>>;
    }>
>({
    pageName: "",
    setPageName: () => {},
});
