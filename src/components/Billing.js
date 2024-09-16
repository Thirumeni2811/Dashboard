import React, { useState } from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import Month from "./Month";
import Year from "./Year";

const Billing = () => {
  const [plan, setPlan] = useState();
  const [value, setValue] = useState('month');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <section>
        <div>
          <h1 className="font-extrabold mb-4 text-4xl">Billing</h1>
          <h1 className="my-2">
            Your plan : <strong>Free trial</strong>
          </h1>
          <h1 className="my-2">
            Plan ends <strong>Jul 31, 2024</strong>
          </h1>
        </div>
        {!plan ? (
          <main>
            <Box 
              className= 'flex flex-col justify-center w-auto'
            >
              <TabContext value={value}>
                <Box className="flex justify-center">
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Monthly" value="month" />
                    <Tab label="Yearly" value="year" />
                  </TabList>
                </Box>
                <div className="text-center">
                  <TabPanel value="month">
                    <Month />
                  </TabPanel>
                  <TabPanel value="year">
                    <Year />
                  </TabPanel>
                </div>
              </TabContext>
            </Box>
            <div className="m-2">
              <h1 className="font-extrabold text-5xl text-center">FAQ</h1>
              <div className="p-4  xl:grid xl:grid-cols-2 xl:gap-12 xl:gap-y-2">
                <div className="text-justify text-xl my-2">
                  <h1 className="font-bold">Is there a free trial ?</h1>
                  <p>Yes! You can try ReplyGuy for free and see the magic for yourself.</p>
                </div>
                <div className="text-justify text-xl my-2">
                  <h1 className="font-bold">What platforms do you support?</h1>
                  <p>We currently support Twitter (X) and Reddit. We are currently adding support for LinkedIn, Tik Tok, Hacker News, and other social networks.</p>
                </div>
                <div className="text-justify text-xl my-2">
                  <h1 className="font-bold">Mention the product name or the full URL?</h1>
                  <p>We highly recommend only mentioning the brand name of your product since mentioning links in posts makes the post more likely to be reported as spam and hidden. We find that humans don't usually type out full URLs in natural conversation and plus, most internet users are happy to do a quick Google Search.</p>
                </div>
                <div className="text-justify text-xl my-2">
                  <h1 className="font-bold">How long does it take to start seeing results?</h1>
                  <p>Within 1-2 weeks, many customers report an uptick in users coming from the replies. Think of it as more of an investment - a Reddit post will be around for a long time for future internet users to stumble upon.</p>
                </div>
                <div className="text-justify text-xl my-2">
                  <h1 className="font-bold">Can I cancel my subscription anytime?</h1>
                  <p>Yes! You can cancel/pause/upgrade/downgrade your subscription anytime from the dashboard.</p>
                </div>
                <div className="text-justify text-xl my-2">
                  <h1 className="font-bold">Other questions?</h1>
                  <p>We are available via live chat to answer your questions!</p>
                </div>
              </div>
            </div>
          </main>

        
          
        ) : (
          <div>
            <h1>Plan Details</h1>
          </div>
        )}

      </section>
    </>
  );
};

export default Billing;
