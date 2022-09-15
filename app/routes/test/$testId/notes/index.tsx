import { ActionFunction, json } from "@remix-run/node";
import { Form } from "@remix-run/react";

type ActionData = {
    formError?: string;
    formMessage?: string;
    fields?: {
        content: string;
        type: string;
    }
}

const reqResponse = (data: ActionData) =>
    json(data, { status: 400 });

export const action: ActionFunction = async({
    request, params
}) => {
    const form = await request.formData();
    const content = form.get("content");
    const type = form.get("type");

    if (
        typeof content !== "string" ||
        typeof type !== "string"
    ) {
        return reqResponse({
            formError: 'Invalid data entered in one or more fields. Please try again.'
        });
    }

    const fields = { content, type };

    // creates notes in the database

    return reqResponse({
        formMessage: 'Note added'
    });
}

export default function AddNotes() {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <Form reloadDocument method="post" >
                <h1 className="text-2xl font-medium mt-6">Add a note or email</h1>
                <p className="mt-2">If you need to add a note to a specific cardholder, please add the note on the cardholder's page.</p>
                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 my-4 xl:mr-12 2xl:mr-24">
                    <div className="flex w-full 2xl:col-span-2">
                        <div className="flex-grow">
                            <textarea name="content" id="content" className="w-full block h-[10rem] overflow-y-scroll bg-resetLightGrey" />
                            <div className="flex w-full mt-4">
                                <input type="file" name="attachment" id="attachment" className="hidden" disabled />
                                <div className="flex-grow"></div>
                                <div className="space-x-2 flex">
                                    <button type="submit" name="type" value="telephone" className="ml-auto bg-orange-900 px-6 py-2 text-resetLightGrey">Add telephone call</button>
                                    <button type="submit" name="type" value="email" className="ml-auto bg-indigo-900 px-6 py-2 text-resetLightGrey">Add email</button>
                                    <button type="submit" name="type" value="note" className="ml-auto bg-cyan-900 px-6 py-2 text-resetLightGrey">Add note</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
      </div>
    );
  }
  