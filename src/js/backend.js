import "../scss/backend.scss";

const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, Flex, FlexBlock, FlexItem, TextControl, Button } =
    wp.components;
const { useState } = wp.element;

// Step 1: Extend the block's attributes to include your new attribute for storing custom data attributes.
function addCustomAttributes(settings, name) {
    // if (name === "core/paragraph") {
    settings.attributes = _.assign(settings.attributes, {
        customDataAttrs: {
            type: "array",
            default: [],
        },
    });
    // }

    return settings;
}

addFilter(
    "blocks.registerBlockType",
    "my-plugin/add-custom-attributes",
    addCustomAttributes
);

// Custom component to manage data attributes
const DataAttributeManager = ({ customDataAttrs, setAttributes }) => {
    const [newAttrName, setNewAttrName] = useState("");
    const [newAttrValue, setNewAttrValue] = useState("");

    const addDataAttribute = () => {
        if (newAttrName) {
            // Only check for attribute name, value can be empty
            const newDataAttrs = [
                ...customDataAttrs,
                { name: newAttrName, value: newAttrValue },
            ];
            setAttributes({ customDataAttrs: newDataAttrs });
            setNewAttrName("");
            setNewAttrValue("");
        }
    };

    const updateDataAttribute = (index, key, value) => {
        const newDataAttrs = [...customDataAttrs];
        newDataAttrs[index][key] = value;
        setAttributes({ customDataAttrs: newDataAttrs });
    };

    const removeDataAttribute = (index) => {
        const newDataAttrs = [...customDataAttrs];
        newDataAttrs.splice(index, 1);
        setAttributes({ customDataAttrs: newDataAttrs });
    };

    return (
        <>
            <Flex
                direction="column"
                gap="6"
            >
                {customDataAttrs.map((attr, index) => (
                    <Flex
                        key={index}
                        direction="column"
                        gap="0"
                    >
                        <Flex>
                            <FlexBlock>
                                <TextControl
                                    label="Attribute"
                                    value={attr.name}
                                    onChange={(value) =>
                                        updateDataAttribute(
                                            index,
                                            "name",
                                            value
                                        )
                                    }
                                />
                            </FlexBlock>
                            <FlexBlock>
                                <TextControl
                                    label="Value"
                                    value={attr.value}
                                    onChange={(value) =>
                                        updateDataAttribute(
                                            index,
                                            "value",
                                            value
                                        )
                                    }
                                />
                            </FlexBlock>
                        </Flex>
                        <Button
                            isSecondary
                            onClick={() => removeDataAttribute(index)}
                            style={{ justifyContent: "center" }}
                        >
                            Remove Attribute
                        </Button>
                    </Flex>
                ))}
                {/* Inputs for adding a new attribute */}
                <Flex
                    direction="column"
                    gap="0"
                >
                    <Flex>
                        <FlexBlock>
                            <TextControl
                                label="Attribute"
                                value={newAttrName}
                                onChange={setNewAttrName}
                            />
                        </FlexBlock>
                        <FlexBlock>
                            <TextControl
                                label="Value"
                                value={newAttrValue}
                                onChange={setNewAttrValue}
                            />
                        </FlexBlock>
                    </Flex>
                    <Button
                        isPrimary
                        onClick={addDataAttribute}
                        style={{ justifyContent: "center" }}
                    >
                        Add New Attribute
                    </Button>
                </Flex>
            </Flex>
        </>
    );
};

// Step 2: Add controls to the block's inspector panel for these attributes.
const withInspectorControl = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        // if (props.name === "core/paragraph") {
        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody
                        title="Data Attributes"
                        initialOpen={false}
                    >
                        <DataAttributeManager
                            customDataAttrs={props.attributes.customDataAttrs}
                            setAttributes={props.setAttributes}
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
        // }
    };
}, "withInspectorControl");

addFilter(
    "editor.BlockEdit",
    "my-plugin/with-inspector-control",
    withInspectorControl
);

// Step 3: Modify the block's save function to output the new attributes.
function addDataToSaveElement(extraProps, blockType, attributes) {
    // if (blockType.name === "core/paragraph") {
    attributes.customDataAttrs.forEach(({ name, value }) => {
        if (name) {
            // Only check for attribute name, value can be empty
            extraProps[name] = value || "";
        }
    });
    // }

    return extraProps;
}

addFilter(
    "blocks.getSaveContent.extraProps",
    "my-plugin/add-data-to-save-element",
    addDataToSaveElement
);
