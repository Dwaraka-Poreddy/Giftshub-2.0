import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import $ from "jquery";
import { SyncAlt } from "@mui/icons-material";
import "./NPackSelect.css";
const allCompBannermgs = {
  magazine: require("../../Images/cardimages/magazine.PNG"),
  challenge: require("../../Images/cardimages/challenge.PNG"),
  aboutquiz: require("../../Images/cardimages/aboutquiz.PNG"),
  calendar: require("../../Images/cardimages/calender.PNG"),
  threedcarousel: require("../../Images/cardimages/3dcarousel.PNG"),
  honeycomb: require("../../Images/cardimages/honeycomb.PNG"),
  journey: require("../../Images/cardimages/journey.PNG"),
  swatchbook: require("../../Images/cardimages/swatchBook.PNG"),
  puzzle:
    "https://firebasestorage.googleapis.com/v0/b/update-image.appspot.com/o/imp%2Ftom-and-jerry-hd-background.jpg?alt=media&token=a5fb8323-7899-46d7-8119-16b69e1e2531",
  specialcard: require("../../Images/cardimages/specialCard.PNG"),
  animatedframe: require("../../Images/cardimages/animatedFrames.PNG"),
  threedimage:
    "https://firebasestorage.googleapis.com/v0/b/update-image.appspot.com/o/imp%2FthreeDsqr.PNG?alt=media&token=89f9386d-931d-4642-a744-761ef2b97f2d",
  greetingcard: require("../../Images/cardimages/greetingcardviolet.PNG"),
  cubes: require("../../Images/cardimages/3dheart.PNG"),
  memorygame: require("../../Images/cardimages/memorygame.PNG"),
  collage:
    "https://firebasestorage.googleapis.com/v0/b/update-image.appspot.com/o/imp%2FcollagePNG.PNG?alt=media&token=145fccf1-8bc0-4615-9ebf-8dc87fdfcae0",
  newspaper: require("../../Images/cardimages/newspaper.PNG"),
  envelopegreetingcard: require("../../Images/cardimages/greetingcardviolet.PNG"),
};
const allComp = [
  {
    id: "magazine",
    ismailsent: false,
    content: "Magazine",
    url: "",
  },
  {
    id: "challenge",
    ismailsent: false,
    content: "Challenge",
    url: "",
  },
  {
    id: "aboutquiz",
    ismailsent: false,
    content: "About Quiz",
    url: "",
  },
  {
    id: "calendar",
    ismailsent: false,
    content: "Calendar",
    url: "",
  },
  {
    id: "threedcarousel",
    ismailsent: false,
    content: "3D Carousel",
    url: "",
  },
  {
    id: "honeycomb",
    ismailsent: false,
    content: "Honey Comb ",
    url: "",
  },
  {
    id: "journey",
    ismailsent: false,
    content: "Journey",
    url: "",
  },
  {
    id: "swatchbook",
    ismailsent: false,
    content: "Swatch Book",
    url: "",
  },
  {
    id: "puzzle",
    ismailsent: false,
    content: "Slide Puzzle",
    url: "",
  },
  {
    id: "specialcard",
    ismailsent: false,
    content: "Special Card",
    url: "",
  },
  {
    id: "animatedframe",
    ismailsent: false,
    content: "Animated Frame ",
    url: "",
  },
  {
    id: "threedimage",
    ismailsent: false,
    content: "3D Image",
    url: "",
  },
  {
    id: "greetingcard",
    ismailsent: false,
    content: "Greeting Card",
    url: "",
  },
  {
    id: "cubes",
    ismailsent: false,
    content: " 3D Heart",
    url: "",
  },
  {
    id: "memorygame",
    ismailsent: false,
    content: "Memory Game",
    url: "",
  },
  {
    id: "collage",
    ismailsent: false,
    content: "Collage",
    url: "",
  },
  {
    id: "newspaper",
    ismailsent: false,
    content: "NewsPaper",
    url: "",
  },
  {
    id: "envelopegreetingcard",
    ismailsent: false,
    content: "Envelope Card",
    url: "",
  },
];

const selectComp = [];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
$(document).ready(function() {
  $(".card").hover(
    function() {
      $(this).removeClass("shadow-none");
      $(this).addClass("shadow");
    },
    function() {
      $(this).removeClass("shadow");
      $(this).addClass("shadow-none");
    }
  );

  // document ready
});
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging
  //   ? "linear-gradient(#fdc46f, #f9deb6)"
  //   : "linear-gradient(#fdc46f, #f9deb6)",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getItemStyle1 = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging
  //   ? "linear-gradient(#fdc46f, #f9deb6)"
  //   : "linear-gradient(#fdc46f, #f9deb6)",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver
    ? "linear-gradient(#fdc46f, #f33f3f)"
    : "linear-gradient(#fdc46f, #f33f3f)",
  padding: grid,
  minHeight: 150,
});
const getListStyle1 = (isDraggingOver) => ({
  background: isDraggingOver
    ? "linear-gradient(#fdc46f,#f33f3f)"
    : "linear-gradient(#fdc46f, #f33f3f)",
  padding: grid,
  minHeight: 150,
});
class N_Pack_Select extends Component {
  state = {
    items: allComp,
    selected: selectComp,
  };

  id2List = {
    droppable: "items",
    droppable2: "selected",
  };

  getList = (id) => this.state[this.id2List[id]];

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      this.setState(state, () => {
        // Call setpackfunc after updating the state
        this.props.setpackfunc(this.state.selected);
      });
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState(
        {
          items: result.droppable,
          selected: result.droppable2,
        },
        () => {
          // Call setpackfunc after updating the state
          this.props.setpackfunc(this.state.selected);
        }
      );
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div class="row">
          <div class="col-lg-8   ">
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {" "}
                  <div className="container-fluid">
                    <center>
                      <h3>All Gifts</h3>
                    </center>
                    <div className="row">
                      {this.state.items.map((item, index) => (
                        <div
                          class="col-sm-6 col-md-4 col-lg-3 p-1"
                          // style={{ height: "235px" }}
                        >
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                {console.log(
                                  "bgimg from comp arrray: ",
                                  allCompBannermgs[item.id]
                                )}
                                <div
                                  style={{
                                    backgroundImage:
                                      "url(" + allCompBannermgs[item.id] + ")",
                                  }}
                                  class="card npackselectcard"
                                >
                                  <img
                                    class="card-img-top npackselectcardimg"
                                    src={allCompBannermgs[item.id]}
                                    alt={index}
                                  />

                                  <h5 class="card-title npackselectcardtitle">
                                    {" "}
                                    {item.content}
                                  </h5>
                                </div>
                              </div>
                            )}
                          </Draggable>{" "}
                        </div>
                      ))}
                    </div>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div class="col-lg-1  ">
            <SyncAlt className="nselectarrow" />
          </div>
          <div class="col-lg-3  ">
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle1(snapshot.isDraggingOver)}
                >
                  <center>
                    <h3>Your Pack</h3>
                  </center>
                  {this.state.selected.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          style={{
                            ...getItemStyle1(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            ),
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div class="card  shadow-none">
                            <div class="row no-gutters">
                              <div class="col-3 m-auto">
                                <img
                                  style={{ width: "45px" }}
                                  src={allCompBannermgs[item.id]}
                                  class="card-img"
                                  alt={index}
                                />
                              </div>
                              <div class="col-9">
                                <div
                                  class="card-body px-0"
                                  style={{
                                    padding: "1rem 1.25rem ",
                                  }}
                                >
                                  Day {index} : {item.content}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    );
  }
}
export default N_Pack_Select;
