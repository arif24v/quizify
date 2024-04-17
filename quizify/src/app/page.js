import Domain from "./components/domains/domain.js";

export default function Home() {
    return (
        <main>
            <div className = "flex flex-row w-full"> 
                <div className = "flex flex-row w-full"> 
                    <Domain title={"Function Groups"} description={"Lorem Ipsum"} author={"Devin"} />
                </div>
                <div className = "flex flex-row w-full">
                    <Domain title={"Function Groups"} description={"Lorem Ipsum"} author={"Devin"} />
                </div>
                <div className = "flex flex-row w-full">
                    <Domain title={"Function Groups"} description={"Lorem Ipsum"} author={"Devin"} />
                </div>
            </div>
        </main>
    );
}