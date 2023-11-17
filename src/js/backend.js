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
        if (newAttrName && newAttrValue) {
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
                gap="4"
            >
                {customDataAttrs.map((attr, index) => (
                    <Flex
                        key={index}
                        gap="4"
                    >
                        <FlexBlock>
                            <TextControl
                                label="Attribute Name"
                                value={attr.name}
                                onChange={(value) =>
                                    updateDataAttribute(index, "name", value)
                                }
                            />
                        </FlexBlock>
                        <FlexBlock>
                            <TextControl
                                label="Attribute Value"
                                value={attr.value}
                                onChange={(value) =>
                                    updateDataAttribute(index, "value", value)
                                }
                            />
                        </FlexBlock>
                        <FlexItem>
                            <Button
                                isDestructive
                                onClick={() => removeDataAttribute(index)}
                            >
                                Remove
                            </Button>
                        </FlexItem>
                    </Flex>
                ))}
            </Flex>
            <Flex gap="4">
                <FlexBlock>
                    <TextControl
                        label="Attribute Name"
                        value={newAttrName}
                        onChange={setNewAttrName}
                    />
                </FlexBlock>
                <FlexBlock>
                    <TextControl
                        label="Attribute Value"
                        value={newAttrValue}
                        onChange={setNewAttrValue}
                    />
                </FlexBlock>
            </Flex>
            <Button
                isPrimary
                onClick={addDataAttribute}
            >
                Add New Attribute
            </Button>
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
                        title="Custom Data Attributes"
                        initialOpen={true}
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

        return <BlockEdit {...props} />;
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
        if (name && value) {
            extraProps[name] = value;
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
