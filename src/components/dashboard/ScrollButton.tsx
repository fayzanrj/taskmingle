import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const ScrollButton: React.FC<{
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}> = ({ direction, onClick, disabled }) => (
  <button
    className="w-fit h-40 rounded-lg  z-20 disabled:text-stone-800"
    onClick={onClick}
    aria-label={`scroll-btn-${direction}`}
    disabled={disabled}
  >
    {direction === "left" ? (
      <MdArrowBackIos size={"2rem"} className="inline-block" />
    ) : (
      <MdArrowForwardIos size={"2rem"} className="inline-block" />
    )}
  </button>
);

export default ScrollButton;
