import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

type Props = {
  percentDone: number;
  error: string | null;
  userFirstTime: boolean;
  showProgress: boolean;
};
export default function DownloadProgress({
  percentDone,
  error,
  userFirstTime,
  showProgress,
}: Props) {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const verb = userFirstTime ? "Downloading" : "Updating";
  const percent = parseFloat(percentDone.toFixed(2));

  const [updatePropTime, setUpdatePropTime] = useState<number>();
  const [showSlowDownloadMessage, setShowSlowDownloadMessage] = useState(false);

  useEffect(
    function handleShowProgress() {
      if (!showProgress) {
        setShow(false);
        return;
      }

      setShow(true);
    },
    [percentDone, error, verb, showProgress]
  );

  useEffect(
    function closeWhen100Percent() {
      if (percentDone < 100) return;

      let timeout: NodeJS.Timeout;

      timeout = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timeout);
    },
    [percentDone]
  );

  useEffect(
    function handleError() {
      if (!error) return;

      setErrorMessage(
        `Something went wrong ${verb.toLowerCase()} your play data. Reload the page to try again.`
      );

      let timeout: NodeJS.Timeout;
      timeout = setTimeout(() => {
        setShow(false);
      }, 10000);

      return () => clearTimeout(timeout);
    },
    [error]
  );

  useEffect(
    function manageDisplayingSlowDownloadMessage() {
      // clear everything when percentDone is 100
      if (percentDone === 100) {
        setUpdatePropTime(undefined);
        setShowSlowDownloadMessage(false);
        return;
      }

      // get current time
      let currentTime = performance.now();

      // set initial time
      if (!updatePropTime) {
        setUpdatePropTime(currentTime);
        return;
      }

      // if time has passed 1 second show the slow download message
      if (currentTime - updatePropTime > 1000) {
        setShowSlowDownloadMessage(true);
        return;
      }

      setShowSlowDownloadMessage(false);
    },
    [percentDone, error, updatePropTime]
  );

  return (
    <Transition
      show={show}
      appear={true}
      enter="transition-transform duration-300 ease-linear"
      enterFrom="-translate-y-32"
      enterTo="translate-y-0"
      leave="transition-transform duration-300 ease-linear"
      leaveFrom="translate-y-0"
      leaveTo="-translate-y-32"
      className={
        "absolute flex flex-col items-center justify-center p-4 text-white -translate-x-1/2 bg-black rounded-md bg-opacity-80 top-4 left-1/2 w-content z-10"
      }
    >
      {errorMessage
        ? errorMessage
        : `${verb} your play data. ${percent}% done.`}

      {showSlowDownloadMessage ? (
        <div className="mt-4 text-center">
          Don't worry. We're still downloading. <br />
          Large collections can take a couple of minutes.
        </div>
      ) : null}
    </Transition>
  );
}
