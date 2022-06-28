import { makeHello } from "shared/module";

function isInstanceOfClass<instanceType extends Instance>(
	part: Instance | undefined,
	className: string,
): part is instanceType {
	if (part !== undefined) {
		if ((part as Instance).ClassName === className) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function waitForChildSafe<instanceType extends Instance>(
	parent: Model,
	childName: string,
	typeName: string,
): instanceType {
	const bodyPart = parent.WaitForChild(childName, 1);
	assert(isInstanceOfClass<instanceType>(bodyPart, typeName));
	return bodyPart;
}
function getBodyPart(character: Model, bodyPartName: string) {
	return waitForChildSafe<MeshPart>(character, bodyPartName, "MeshPart");
}

const tsFolder = script.Parent;
assert(isInstanceOfClass<Folder>(tsFolder, "Folder"));
const character = tsFolder.Parent;
assert(isInstanceOfClass<Model>(character, "Model"));
const humanoid = waitForChildSafe<Humanoid>(character, "Humanoid", "Humanoid");
const lowerTorso = getBodyPart(character, "LowerTorso");
const head = getBodyPart(character, "Head");
const leftUpperArm = getBodyPart(character, "LeftUpperArm");
const rightUpperArm = getBodyPart(character, "RightUpperArm");
const leftUpperLeg = getBodyPart(character, "LeftUpperLeg");
const rightUpperLeg = getBodyPart(character, "RightUpperLeg");

const rootJoint = lowerTorso.WaitForChild("Root", 1);
assert(isInstanceOfClass<Motor6D>(rootJoint, "Motor6D"));

print("Humanoid health is " + tostring(humanoid.Health));
