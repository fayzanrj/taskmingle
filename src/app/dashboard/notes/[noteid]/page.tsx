import GoBack from "@/components/GoBack";
import NoteActionBtns from "@/components/notes/NoteActionBtns";
import NoteTextArea from "@/components/notes/NoteTextArea";
import React from "react";

const NoteDetail = () => {
  const note =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, provident. Minus sapiente, excepturi quis praesentium ab, odit vitae officiis reprehenderit velit provident dicta aspernatur. Harum, possimus explicabo. Quod possimus pariatur nobis voluptatem, facere repellendus, molestias adipisci obcaecati quia temporibus vero atque accusamus repudiandae inventore! Ipsa, quasi, cum repellendus modi culpa, ad nobis excepturi quisquam fugit est quo nisi cumque veniam voluptates reprehenderit. Excepturi, et dicta atque aperiam quidem deleniti debitis sed sapiente delectus voluptatum odit vero voluptatem error! Accusamus odio nemo ratione, non, excepturi, nostrum sit fugiat fuga ipsa neque animi rem deleniti? Aperiam incidunt reiciendis commodi facere blanditiis. Eveniet optio quo magnam fuga numquam ducimus dolore placeat consequuntur eos deserunt corrupti voluptates maxime reiciendis unde odio error id praesentium modi, porro iste facere quasi illo dicta. Accusantium qui amet asperiores nisi. Voluptate velit magnam illo quia, eos tempora, omnis quo assumenda quasi odit officia atque dignissimos ipsum asperiores vitae.";

  return (
    <div className="relative">
      {/* Go back Button */}
      <GoBack />

      <div className="w-full min-h-[calc(100svh_-_7.5rem)] sm:w-[30rem] md:w-[32rem] p-2 mx-auto mt-10">
        <NoteTextArea note={note} />
      </div>
    </div>
  );
};

export default NoteDetail;
