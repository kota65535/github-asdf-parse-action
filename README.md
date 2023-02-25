# github-asdf-parse-action

GitHub Action for parsing asdf [.tool-versions](https://asdf-vm.com/manage/configuration.html#tool-versions) file.

## Usage

For example, given `.tool-versions` file in the repository root.

```
java corretto-17.0.5.8.1
nodejs 16.19.0
```

The usage in your workflow is as follows.
The tool versions can be obtained from the outputs map by the tool name.

```yaml

  - name: Parse asdf .tool-versions
    uses: kota65535/github-asdf-parse-action@v1
    id: versions

  - name: Show outputs
    run: |
      echo "${{ steps.versions.outputs.java }}"     # => corretto-17.0.5.8.1
      echo "${{ steps.versions.outputs.nodejs }}"   # => 16.19.0

```

## Inputs

You can specify a custom regular expression with named groups for each tool to obtain the part of the version string,
not only the entire one.
The matched named groups can be obtained from the outputs map by `${tool name}-${group name}`.

```yaml

  - name: Parse asdf .tool-versions
    uses: kota65535/github-asdf-parse-action@v1
    id: versions
    with:
      java: "^(?<distro>\\w+)-(?<major>\\d+)"

  - name: Show outputs
    run: |
      echo "${{ steps.versions.outputs.java }}"         # => corretto-17.0.5.8.1
      echo "${{ steps.versions.outputs.java-distro }}"  # => corretto
      echo "${{ steps.versions.outputs.java-major }}"   # => 17

  # Example
  - name: Setup Java
    uses: actions/setup-java@v3
    with:
      distribution: ${{ steps.versions.outputs.java-distro }}   # => corretto
      java-version: ${{ steps.versions.outputs.java-major }}    # => 17

```
