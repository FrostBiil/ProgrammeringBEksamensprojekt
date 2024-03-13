import React from 'react';
import ListComponent from '../components/ListComponent';

const HomePage: React.FC = () => {
    let items = [
        "Clone or download repository from GitHub",
        "Install dependencies with yarn",
        "To start development server run npm start command",
        "Run tests to make sure your changes do not break the build",
        "Submit a pull request once you are done",
      ];

      const handleSelectItem = (item: string) => {
        console.log(item);
      }

    return (
        <div>
            <ListComponent items={items} heading="List" onSelectItem={handleSelectItem} />
        </div>
    );
}

export default HomePage;
